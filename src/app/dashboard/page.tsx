"use client";

import { useQuery } from "@tanstack/react-query";
import type { AllDocumentsResponse } from "@/types/document";
import type { Document as PdfDocument } from "@/types/document";
import ContainerWrapper from "@/components/ContainerWrapper";
import Dropzone from "./_components/Dropzone";
import MyFiles from "./_components/MyFiles";
import type { getSubscriptionInformations } from "@/lib/stripe";

const Dashboard = () => {
  const {
    data: subscriptionInformations,
    isPending: isPendingSubscriptionInformationsFetch,
    error: errorSubscriptionInformationsFetch,
  } = useQuery({
    queryKey: ["subscritpion-informations"],
    queryFn: async (): Promise<
      Awaited<ReturnType<typeof getSubscriptionInformations>>
    > => {
      const response = await fetch("/api/subscription", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = (await response.json()) as {
        message: {
          subscriptionInformations: Awaited<
            ReturnType<typeof getSubscriptionInformations>
          >;
        };
        status: number | undefined;
      };

      return result.message.subscriptionInformations;
    },
  });

  const {
    data: documents,
    isPending: isPendingDocumentsFetch,
    error: errorDocumentsFetch,
  } = useQuery({
    queryKey: ["myFiles"],
    queryFn: async (): Promise<PdfDocument[] | []> => {
      const response = await fetch("/api/file", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = (await response.json()) as AllDocumentsResponse;

      return result.documents;
    },
  });

  return (
    <ContainerWrapper className="mt-7 md:mt-14">
      <div className="mb-7 flex flex-row justify-between border-b-2 pb-2">
        <h1>My files</h1>
        <Dropzone
          documentsLength={documents?.length}
          subscriptionInformations={subscriptionInformations}
        />
      </div>
      <MyFiles
        documents={documents}
        isPending={
          isPendingSubscriptionInformationsFetch || isPendingDocumentsFetch
        }
        error={errorSubscriptionInformationsFetch || errorDocumentsFetch}
      />
    </ContainerWrapper>
  );
};

export default Dashboard;
