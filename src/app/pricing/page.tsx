import { cn } from "@/lib/utils";
import PlanFeature from "@/app/pricing/_components/PlanFeature";
import SignInButton from "@/components/SignInButton";
import ContainerWrapper from "@/components/ContainerWrapper";
import {
  FREE_PLAN_UPLOAD_LIMIT,
  PRO_PLAN,
  PRO_PLAN_UPLOAD_LIMIT,
} from "@/constants/plan";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/auth";

const planItems = [
  {
    plan: "Free",
    description: "For hobby",
    price: 0,
    features: {
      uploadLimit: FREE_PLAN_UPLOAD_LIMIT.toString(),
      fileSizeLimit: "4MB",
      supportedDevice: "Desktop and Mobile are supported",
      customerSuppport: false,
      newFeatures: false,
    },
  },
  {
    plan: "Pro",
    description: "For professional",
    price: PRO_PLAN,
    features: {
      uploadLimit: PRO_PLAN_UPLOAD_LIMIT.toString(),
      fileSizeLimit: "16MB",
      supportedDevice: "Desktop and Mobile are supported",
      customerSuppport: true,
      newFeatures: true,
    },
  },
];

const Pricing = async () => {
  const session = await auth();

  return (
    <ContainerWrapper>
      <div className="mx-auto">
        <h1 className="mb-7 text-center text-5xl md:text-7xl">Pricing</h1>
        <p className="mb-10 max-w-prose text-center text-muted-foreground md:mb-20 md:text-lg">
          Start free, chat with any document and pay as you go
        </p>

        <div className="flex flex-col gap-5 md:flex-row">
          {planItems.map((item) => {
            return (
              <div
                key={item.plan}
                className={cn(
                  "space-y-2 rounded-xl border-[2px] bg-white p-5 shadow-lg",
                  {
                    "border-stone-700": item.plan === "Free",
                    "border-primary": item.plan === "Pro",
                  },
                )}
              >
                <h2 className="text-center text-xl font-bold">{item.plan}</h2>
                <p className="text-center text-muted-foreground">
                  {item.description}
                </p>
                <p className="py-8 text-center md:py-14">
                  <span className="text-center text-6xl font-bold">
                    ${item.price}
                  </span>
                  /month
                </p>
                <PlanFeature
                  isAccess={true}
                  value={item.features.uploadLimit}
                  text="PDF upload limit"
                />
                <PlanFeature
                  isAccess={true}
                  value={item.features.fileSizeLimit}
                  text="file size limit"
                />
                <PlanFeature
                  isAccess={true}
                  text={item.features.supportedDevice}
                />
                <PlanFeature
                  isAccess={item.features.newFeatures}
                  text="New features early access"
                />
                <PlanFeature
                  isAccess={item.features.customerSuppport}
                  text="Customer support"
                />
                <div className="!mt-5 w-full">
                  {!session?.user && (
                    <SignInButton
                      variant={"outline"}
                      provider="google"
                      text="Free trial"
                      className="w-full"
                    />
                  )}
                  {session?.user && item.plan === "Pro" && (
                    <Link
                      className={cn(
                        buttonVariants({ variant: "default" }),
                        "w-full",
                      )}
                      href="/subscription"
                    >
                      Manage Subscription
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ContainerWrapper>
  );
};

export default Pricing;
