"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import type { Message } from "@/types/message";

interface ChatInputProps {
  documentId: string;
  messages: Message[] | [] | undefined;
  addMessage: (author: "USER" | "AI", text: string) => void;
}

const ChatInput = ({ documentId, messages, addMessage }: ChatInputProps) => {
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState<string>("");

  const mutation = useMutation({
    mutationFn: (text: string) =>
      fetch(`/api/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ documentId, text, messages }),
      }),
    onSuccess: async () => {
      // Invalidate and refetch
      await queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.currentTarget.value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      addMessage("USER", inputValue);
      mutation.mutate(inputValue);
      setInputValue("");
    }
  }

  return (
    <div className="relative my-3 flex h-11 flex-row items-center gap-3 rounded-md border-2 border-stone-200">
      <input
        className="h-10 w-full rounded-md px-2 py-1"
        placeholder="Ask something..."
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        value={inputValue}
        disabled={mutation.isPending}
      />
      <Button
        variant={"ghost"}
        size={"icon"}
        className="absolute right-0"
        disabled={!inputValue || mutation.isPending}
        onClick={() => {
          addMessage("USER", inputValue);
          mutation.mutate(inputValue);
          setInputValue("");
        }}
      >
        <Send className="h-5 w-5 text-primary" />
      </Button>
    </div>
  );
};

export default ChatInput;
