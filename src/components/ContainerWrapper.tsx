import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ContainerWrapperProps {
  children: ReactNode;
  className?: string;
}

const ContainerWrapper = ({ children, className }: ContainerWrapperProps) => {
  return (
    <div
      className={cn(
        "container mx-auto mt-14 flex flex-1 flex-col px-4 md:mt-28",
        className,
      )}
    >
      <main className="flex flex-1 flex-col gap-5">{children}</main>
    </div>
  );
};

export default ContainerWrapper;
