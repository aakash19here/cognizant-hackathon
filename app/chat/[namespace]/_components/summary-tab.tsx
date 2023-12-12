import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function SummaryTab({ namespace }: { namespace: string }) {
  const { messages, handleSubmit, setInput, isLoading } = useChat({
    api: `/api/summarize/${namespace}`,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setInput(
      `
      Summarize the given context. If the user is a single person so use He as the pronoun

      Don't mention it as document anywhere. Use the context and name the thing
      `
    );

    handleSubmit(e);
  };

  return (
    <TabsContent value="summarize">
      <div className="p-4">
        <form onSubmit={(e) => onSubmit(e)}>
          <Button
            className={cn(
              (isLoading && "hidden") || (messages.length > 1 && "hidden")
            )}
          >
            Generate Summary
          </Button>
        </form>
        <div className="px-4 pb-20 flex-1 overflow-y-hidden">
          <ul className="">
            {messages
              .filter((m) => m.role === "assistant")
              .map((m, index) => (
                <li key={index} className="overflow-y-auto">
                  <Markdown remarkPlugins={[remarkGfm]} className="prose">
                    {m.content}
                  </Markdown>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </TabsContent>
  );
}
