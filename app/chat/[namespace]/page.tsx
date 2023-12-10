import { getPineconeClient } from "@/lib/pinecone";
import { ChatClient } from "./_components/chat-client";

type Params = {
  params: {
    namespace: string;
  };
};

export default async function Namespace({ params: { namespace } }: Params) {
  const client = await getPineconeClient();
  const namespaces = await client.Index("subjects").describeIndexStats();

  return (
    <div>
      <ChatClient namespace={namespace} />
    </div>
  );
}
