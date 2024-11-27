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
        "h-[500px] w-full overflow-x-hidden overflow-y-scroll border-[1px] border-stone-200 bg-white p-3 md:h-full md:w-1/2",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ScrollAreaWrapper;
