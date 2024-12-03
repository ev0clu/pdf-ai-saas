import { cn } from "@/lib/utils";

interface LoaderProps {
  size: "icon" | "default";
}

export function Loader({ size }: LoaderProps) {
  return (
    <div
      className={cn("flex h-full flex-1 items-center justify-center", {
        "py-0": size === "icon",
        "py-20": size === "default",
      })}
    >
      <div
        className={cn(
          "text-surface inline-block animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-rose-500 motion-reduce:animate-[spin_1.5s_linear_infinite]",
          { "h-10 w-10": size === "default", "h-5 w-5": size === "icon" },
        )}
        role="img"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}
