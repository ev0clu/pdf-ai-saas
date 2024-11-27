"use client";

import { Bot, MessageSquareMore } from "lucide-react";
import ScrollAreaWrapper from "@/components/ScrollAreaWrapper";
import { useQuery } from "@tanstack/react-query";
import type { AllMessagesResponse, Message } from "@/types/message";
import { Loader } from "@/components/Loader";
import ErrorWrapper from "@/components/ErrorWrapper";
import { cn } from "@/lib/utils";
import ChatInput from "./ChatInput";
import { useEffect, useRef } from "react";

interface ChatProps {
  id: string;
}

const Chat = ({ id }: ChatProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

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

  // Auto-scroll to the latest message
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [messages]);

  if (error) <ErrorWrapper text={error.message} />;

  return (
    <ScrollAreaWrapper className="flex flex-col justify-end gap-1">
      {isPending ? (
        <Loader />
      ) : (
        <>
          <div
            className="flex flex-col justify-end space-y-2 md:h-full"
            ref={scrollRef}
          >
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
                    className={cn("flex w-full", {
                      "justify-start": message.author === "AI",
                      "justify-end": message.author === "USER",
                    })}
                  >
                    <div
                      className={cn(
                        "flex flex-row gap-2 rounded-md border border-stone-200 px-2 py-1",
                        {
                          "bg-primary-foreground": message.author === "AI",
                          "bg-stone-50": message.author === "USER",
                        },
                      )}
                    >
                      {" "}
                      {message.author === "AI" && (
                        <span className="h-5 w-5">
                          <Bot className="text-primary" />
                        </span>
                      )}
                      <span>{message.text}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <ChatInput documentId={id} messages={messages} />
        </>
      )}
    </ScrollAreaWrapper>
  );
};

export default Chat;
