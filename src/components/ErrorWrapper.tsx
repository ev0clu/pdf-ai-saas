import React from "react";
import ScrollAreaWrapper from "./ScrollAreaWrapper";
import { MessageCircleWarning } from "lucide-react";

interface ErrorWrapperProps {
  text: string;
}

const ErrorWrapper = ({ text }: ErrorWrapperProps) => {
  return (
    <ScrollAreaWrapper className="flex flex-1 flex-col items-center justify-center">
      <span>
        <MessageCircleWarning className="h-10 w-10 text-primary" />
      </span>
      <span className="w-1/2 text-center">{text}</span>
    </ScrollAreaWrapper>
  );
};

export default ErrorWrapper;
