"use client";

import { MessageSquareMore, Send } from "lucide-react";
import ScrollAreaWrapper from "@/components/ScrollAreaWrapper";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import type { AllMessagesResponse, Message } from "@/types/message";
import { Loader } from "@/components/Loader";
import ErrorWrapper from "@/components/ErrorWrapper";
import { cn } from "@/lib/utils";

interface ChatProps {
  id: string;
}

const Chat = ({ id }: ChatProps) => {
  const {
    data: messages,
    error,
    isPending,
  } = useQuery({
    queryKey: ["messages", id],
    queryFn: async (): Promise<Message[] | []> => {
      const response = await fetch(`/api/message?file=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = (await response.json()) as AllMessagesResponse;

      return result.messages;
    },
  });

  if (error) <ErrorWrapper text={error.message} />;

  return (
    <ScrollAreaWrapper className="flex flex-1 flex-col">
      {isPending ? (
        <Loader />
      ) : (
        <>
          <div className="h-full">
            {messages?.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 p-3">
                <span>
                  <MessageSquareMore className="h-10 w-10 text-primary" />
                </span>
                <span className="text-center text-muted-foreground">
                  Ask from AI to get started
                </span>
              </div>
            ) : (
              messages?.map((message) => {
                return (
                  <div
                    key={message.id}
                    className={cn({
                      "text-start": message.author === "AI",
                      "text-right": message.author === "USER",
                    })}
                  >
                    {message.text}
                  </div>
                );
              })
            )}
          </div>
          <div className="relative mx-3 my-3 flex h-11 flex-row items-center gap-3 rounded-md border-2 border-stone-200">
            <input className="h-10 w-full rounded-md px-2 py-1" />
            <Button
              variant={"ghost"}
              size={"icon"}
              className="absolute right-0"
            >
              <Send className="h-5 w-5 text-primary" />
            </Button>
          </div>
        </>
      )}
    </ScrollAreaWrapper>
  );
};

export default Chat;
