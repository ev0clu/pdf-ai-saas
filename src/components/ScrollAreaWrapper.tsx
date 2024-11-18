import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ScrollAreaWrapperProps {
  children: ReactNode;
  className?: string;
}

const ScrollAreaWrapper = ({ children, className }: ScrollAreaWrapperProps) => {
  return (
    <div
      className={cn(
        "w-1/2 overflow-y-scroll border-[1px] border-stone-200 bg-white",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ScrollAreaWrapper;
