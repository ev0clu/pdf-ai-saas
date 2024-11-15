"use client";

import { Loader } from "@/components/Loader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AllDocumentResponse } from "@/types/document";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";

let toastId: string | number | undefined = undefined;

const MyFiles = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

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

      const result = (await response.json()) as AllDocumentResponse;

      return result.documents;
    },
  });

  const mutation = useMutation({
    mutationFn: (fileId: string) =>
      fetch(`/api/file/${fileId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/pdf",
        },
      }),
    onMutate: () => {
      toastId = toast.loading("Delete...");
    },
    onSuccess: async () => {
      setIsModalOpen(false);
      toast.success("PDF successfully deleted.", { id: toastId });

      // Invalidate and refetch
      await queryClient.invalidateQueries({ queryKey: ["myFiles"] });
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
          <Link href={`/dashboard/${document.id}`}>
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

              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="h-7 w-7 rounded-sm p-1 hover:bg-primary-foreground hover:text-primary"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <Trash2 className="text-primary" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Delete</TooltipContent>
                </Tooltip>

                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{document.name}</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this document? You
                        can&apos;t undo this.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        type="submit"
                        onClick={() => mutation.mutate(document.id)}
                      >
                        Confirm
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TooltipProvider>
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MyFiles;
