import { cn } from "@/lib/utils";
import PlanFeature from "@/app/pricing/_components/PlanFeature";
import SignInButton from "@/components/SignInButton";

const planItems = [
  {
    plan: "Free",
    description: "For hobby",
    price: 0,
    features: {
      uploadLimit: "2",
      fileSizeLimit: "4MB",
      supportedDevice: "Desktop and Mobile are supported",
      customerSuppport: false,
      newFeatures: false,
    },
  },
  {
    plan: "Pro",
    description: "For professional",
    price: 10,
    features: {
      uploadLimit: "30",
      fileSizeLimit: "16MB",
      supportedDevice: "Desktop and Mobile are supported",
      customerSuppport: true,
      newFeatures: true,
    },
  },
];

const Pricing = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-7 text-center text-5xl font-bold md:text-7xl">
        Pricing
      </h1>
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
                text="PDF upload limit/month"
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
                <SignInButton
                  variant={item.plan === "Free" ? "outline" : "default"}
                  provider="google"
                  text="Free trial"
                  className="w-full"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pricing;
