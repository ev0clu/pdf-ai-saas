"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import type { SubscriptionSessionResponse } from "@/types/stripe";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContainerWrapper from "@/components/ContainerWrapper";
import { useAppContext } from "@/components/AppContext";

const ManageSubscription = () => {
  const { subscriptionInformations } = useAppContext();

  const [mount, setMount] = useState(false);

  const searchParams = useSearchParams();
  const searchSuccess = searchParams.get("success");
  const searchCanceled = searchParams.get("canceled");

  const mutation = useMutation({
    mutationFn: async () => {
      const toastId = toast.loading("Preparing your subscription...");
      const response = await fetch(`/api/subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: subscriptionInformations?.userId }),
      });
      const result = (await response.json()) as SubscriptionSessionResponse;

      if (response.ok) {
        toast.success("Redirecting to payment", {
          id: toastId,
        });
        window.location.href = `${result.stripeSessionUrl}`;
      } else {
        if (result.message) {
          toast.error(result.message);
        } else {
          toast.error("An unexpected error occurred", {
            id: toastId,
          });
        }
      }
    },
  });

  useEffect(() => {
    setMount(true);
  }, []);

  useEffect(() => {
    if (mount) {
      if (searchCanceled === "true") {
        setMount(false);
        toast.info("Subscription has not changed");
      } else if (searchSuccess === "true") {
        setMount(false);
        toast.success("Subscription to Pro Plan has successed");
      }
    }
  }, [mount, searchCanceled, searchSuccess]);

  return (
    <ContainerWrapper className="items-center">
      <Card className="flex w-[350px] flex-col items-center">
        <CardHeader>
          <CardTitle>Subscription plan</CardTitle>
          <CardDescription>
            You are currently on{" "}
            <span className="font-bold">
              {subscriptionInformations?.isSubscribed ? "PRO" : "FREE"}
            </span>
          </CardDescription>
        </CardHeader>
        {subscriptionInformations?.stripeCurrentPeriodEnd &&
          subscriptionInformations?.isSubscribed && (
            <CardContent>
              <div>
                {subscriptionInformations?.isCanceled ? (
                  <span>Your plan has ended at </span>
                ) : (
                  <span>Your plan renews on </span>
                )}
                <span className="font-bold text-muted-foreground">
                  {format(
                    new Date(subscriptionInformations?.stripeCurrentPeriodEnd),
                    "MM/dd/yyyy",
                  )}
                </span>
              </div>
            </CardContent>
          )}

        <CardFooter>
          <Button onClick={() => mutation.mutate()}>Manage subscription</Button>
        </CardFooter>
      </Card>
    </ContainerWrapper>
  );
};

export default ManageSubscription;
