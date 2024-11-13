"use client";

import { Loader } from "@/components/Loader";
import { useQuery } from "@tanstack/react-query";
import type { DocumentPOSTresponse } from "@/types/document";
import type { Document as PdfDocument } from "@/types/document";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MyFiles = () => {
  const {
    data: documents,
    isPending,
    error,
  } = useQuery({
    queryKey: ["myFiles"],
    queryFn: async (): Promise<PdfDocument[] | []> => {
      const response = await fetch("/api/file", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = (await response.json()) as DocumentPOSTresponse;

      return result.documents;
    },
  });

  if (isPending) return <Loader />;
  if (error) return <p>{error.message}</p>;
  if (!documents || documents.length === 0)
    return <p>There is still no any PDF documents.</p>;

  return (
    <ul className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4">
      {documents.map((document) => (
        <li
          key={document.id}
          className="m-auto w-60 rounded-md bg-white p-4 shadow-lg hover:cursor-pointer hover:bg-white/50"
        >
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger className="w-40 truncate">
                {document.name}
              </TooltipTrigger>
              <TooltipContent>
                <p>{document.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Separator className="mb-2 mt-1" />

          <p className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
            <span>
              {format(new Date(document.createdAt), "HH:mm:ss, MM/dd/yyyy")}
            </span>
            <span>
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="h-7 w-7 rounded-sm p-1 hover:bg-primary-foreground hover:text-primary"
                    >
                      <Trash2 />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Detele</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
          </p>
        </li>
      ))}
    </ul>
  );
};

export default MyFiles;
