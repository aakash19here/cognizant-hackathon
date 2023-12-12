import { NextRequest, NextResponse } from "next/server";
import {
  LangChainStream,
  Message,
  StreamingTextResponse,
  experimental_StreamData,
} from "ai";
import { getVectorStore } from "@/lib/vector-store";
import { getPineconeClient } from "@/lib/pinecone";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { chatModel } from "@/lib/llm";

export const runtime = "edge";

const formatMessage = (message: Message) => {
  return `${message.role === "user" ? "Human" : "Assistant"}: ${
    message.content
  }`;
};

type Params = {
  params: {
    namespace: string;
  };
};

export async function POST(
  req: NextRequest,
  { params: { namespace } }: Params
) {
  const body = await req.json();
  const messages: Message[] = body.messages ?? [];
  console.log("Messages ", messages);
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const question = messages[messages.length - 1].content;

  const chatHistory = "";

  console.log("Chat history ", formattedPreviousMessages.join("\n"));

  if (!question) {
    return NextResponse.json("Error: No question in the request", {
      status: 400,
    });
  }

  try {
    // Open AI recommendation
    const sanitizedQuestion = question.trim().replaceAll("\n", " ");
    const pineconeClient = await getPineconeClient();
    const vectorStore = await getVectorStore(pineconeClient, namespace);
    const { stream, handlers } = LangChainStream({
      experimental_streamData: true,
    });
    const data = new experimental_StreamData();

    const summaryTemplate = `Write a minimum of 20, or as many concise bullet points summary of the following and make sure you include all the important things in the context. Analyze the entire document carefully and provide summary:
         {context}
        CONSCISE SUMMARY IN BULLET POINTS:`;

    const chain = ConversationalRetrievalQAChain.fromLLM(
      chatModel,
      vectorStore.asRetriever(),
      {
        // qaTemplate: QA_TEMPLATE,
        qaTemplate: summaryTemplate,
        verbose: true,
        returnSourceDocuments: true, //default 4
        questionGeneratorChainOptions: {
          llm: chatModel,
        },
      }
    );
    chain
      .call(
        {
          question: sanitizedQuestion,
          chat_history: chatHistory,
        },
        [handlers]
      )
      .then(async (res) => {
        const sourceDocuments = res?.sourceDocuments;
        const firstTwoDocuments = sourceDocuments.slice(0, 2);
        const pageContents = firstTwoDocuments.map(
          ({ pageContent }: { pageContent: string }) => pageContent
        );
        console.log("already appended ", data);
        data.append({
          sources: pageContents,
        });
        data.close();
      });

    return new StreamingTextResponse(stream, {}, data);
  } catch (error) {
    console.error("Internal server error ", error);
    return NextResponse.json("Error: Something went wrong. Try again!", {
      status: 500,
    });
  }
}
