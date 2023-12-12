import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import React, { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const SKELETONS = Array.from({ length: 8 }, (_, i) => i + 1);

export default function FlashcardTab({ namespace }: { namespace: string }) {
  const { messages, handleSubmit } = useChat({
    api: `/api/flashcard/${namespace}`,
    initialInput: "Generate flash cards based on the context given to you.",
    onResponse: () => {
      setIsLoading(false);
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  return (
    <TabsContent value="flashcards">
      <div className="p-4">
        <form
          onSubmit={(e) => {
            setIsLoading(true);
            handleSubmit(e);
          }}
        >
          <Button
            className={cn(
              (isLoading && "hidden") || (messages.length > 1 && "hidden")
            )}
          >
            Generate Flashcards
          </Button>
        </form>
        <div className="px-4 pb-20 flex-1 overflow-y-hidden">
          {isLoading &&
            SKELETONS.map((id) => (
              <Skeleton className="w-full my-5 h-[3vh]" key={id} />
            ))}
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
