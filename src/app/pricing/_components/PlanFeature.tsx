import { cn } from "@/lib/utils";
import { CircleCheck, CircleMinus } from "lucide-react";

interface PlanFeatureProps {
  isAccess: boolean;
  value?: string;
  text: string;
}

const PlanFeature = ({ isAccess, value, text }: PlanFeatureProps) => {
  return (
    <div className="flex flex-row gap-5">
      {isAccess ? (
        <CircleCheck className="text-primary" />
      ) : (
        <CircleMinus className="text-gray-400" />
      )}
      <p>
        {value && <span className="font-extrabold">{value}</span>}{" "}
        <span className={cn({ "text-gray-400": !isAccess })}>{text}</span>
      </p>
    </div>
  );
};

export default PlanFeature;
