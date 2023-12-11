"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/JRVx6GfNwWA
 */

import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "ai/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getFilePath } from "@/lib/utils";

interface IChatProps {
  namespace: string;
}

export function ChatClient({ namespace }: IChatProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: `/api/chat/${namespace}`,
  });

  return (
    <div className="grid h-screen w-full grid-cols-[1fr,1fr]">
      <div className="flex flex-col h-full border-r bg-gray-100/40 overflow-hidden">
        <div className="flex h-16 px-4 py-2 items-center border-b">
          <h1 className="font-semibold text-lg">PDF Viewer</h1>
        </div>
        <div className="flex flex-1 py-2">
          <div className="grid gap-4 p-4 w-full">
            <iframe src={getFilePath(namespace)} className="w-full h-[85vh]" />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex h-16 px-4 py-2 items-center border-b">
          <h1 className="font-semibold text-lg">Interaction Modes</h1>
        </div>
        <div className="flex flex-1 py-2">
          <Tabs className="w-full" defaultValue="chat">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="chat">Q&A</TabsTrigger>
              <TabsTrigger value="summarize">Summarize</TabsTrigger>
              <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
            </TabsList>
            <TabsContent
              value="chat"
              className="flex flex-col flex-1 overflow-y-hidden"
            >
              <div className="px-4 pb-20 flex-1 overflow-y-hidden">
                <ul className="">
                  {messages.map((m, index) => (
                    <li key={index} className="overflow-y-auto">
                      {m.role === "user" ? "User: " : "AI: "}
                      <Markdown remarkPlugins={[remarkGfm]} className="prose">
                        {m.content}
                      </Markdown>
                    </li>
                  ))}
                </ul>
              </div>
              <form
                className="mt-auto space-y-4 p-4 border-t fixed bottom-1 w-[50%]"
                onSubmit={handleSubmit}
              >
                <div className="flex justify-between items-center">
                  <Input
                    className="mr-2 flex-grow"
                    id="message"
                    onChange={handleInputChange}
                    value={input}
                    placeholder="Type your message here..."
                  />
                  <Button>Send</Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="summarize">
              <div className="p-4">
                <Button>Generate Summary</Button>
              </div>
            </TabsContent>
            <TabsContent value="flashcards">
              <div className="p-4">
                <Button>Generate Flashcards</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
