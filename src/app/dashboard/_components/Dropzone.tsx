"use client";

import { useUploadThing } from "@/lib/uploadthing-client";
import { useRouter } from "next/navigation";
import { CloudUpload, File, Plus } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import type { FileRejection } from "react-dropzone";
import { ErrorCode } from "react-dropzone";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  FREE_PLAN_UPLOAD_LIMIT,
  PRO_PLAN_UPLOAD_LIMIT,
} from "@/constants/plan";
import type { getSubscriptionInformations } from "@/lib/stripe";

let toastId: string | number | undefined = undefined;

interface DropzoneProps {
  documentsLength: number | undefined;
  subscriptionInformations:
    | Awaited<ReturnType<typeof getSubscriptionInformations>>
    | undefined;
}

const Dropzone = ({
  documentsLength,
  subscriptionInformations,
}: DropzoneProps) => {
  const router = useRouter();

  const { startUpload, isUploading } = useUploadThing(
    subscriptionInformations?.plan === "FREE"
      ? "freePlanPdfUpload"
      : "proPlanPdfUpload",
    {
      onClientUploadComplete: (res) => {
        toast.dismiss(toastId);
        router.push(`/dashboard/${res[0].serverData.docId}`);
      },
      onUploadError: () => {
        toast.error("error occurred while uploading", { id: toastId });
      },
      onUploadBegin: () => {
        toastId = toast.loading("Uploading...", { id: toastId });
      },
    },
  );

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const errorCode = rejectedFiles[0].errors[0].code as ErrorCode;
    let reason = "";

    if (errorCode === ErrorCode.FileInvalidType) {
      reason = `*.${rejectedFiles[0].file.type.split("/")[0]} does not supported`;
    } else if (errorCode === ErrorCode.FileTooLarge) {
      reason = `${subscriptionInformations?.plan} plan does not support ${Math.floor(rejectedFiles[0].file.size / 1_000_000)}MB file size`;
    }

    toast.error(reason);
  };

  const onDropAccepted = useCallback(
    (files: File[]) => {
      if (
        (subscriptionInformations?.plan === "FREE" &&
          documentsLength !== undefined &&
          documentsLength < 1) ||
        (subscriptionInformations?.plan === "PRO" &&
          documentsLength !== undefined &&
          documentsLength < 30)
      ) {
        startUpload(files);
      } else {
        const reason = `${subscriptionInformations?.plan} plan does not support more than ${subscriptionInformations?.plan === "FREE" ? FREE_PLAN_UPLOAD_LIMIT : PRO_PLAN_UPLOAD_LIMIT} file(s)`;
        toast.error(reason);
      }
    },
    [startUpload, documentsLength, subscriptionInformations?.plan],
  );

  const onError = (error: Error) => {
    toast.error(error.message);
  };

  const pdfSize = useMemo(
    () =>
      subscriptionInformations?.plan === "FREE"
        ? 4 * 1_000_000
        : 16 * 1_000_000,
    [subscriptionInformations],
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDropRejected,
      onError,
      onDropAccepted,
      accept: { "application/pdf": [".pdf"] },
      maxSize: pdfSize,
      multiple: false,
    });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus /> Add PDF
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby="dropzone"
        className={cn(
          "flex h-52 w-full items-center justify-center rounded-lg bg-white p-10 shadow-lg md:h-60 md:w-96",
          {
            "bg-stone-200": isUploading,
          },
        )}
      >
        <DialogHeader className="hidden">
          <DialogTitle className="hidden"></DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <div
          {...getRootProps()}
          className={cn(
            "flex h-full w-full flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-rose-500/50 bg-rose-50/50 p-10 text-center text-sm hover:cursor-pointer hover:border-rose-500 hover:bg-rose-50",
            {
              "pointer-events-none border-stone-500 bg-stone-200": isUploading,
            },
          )}
        >
          <input
            {...getInputProps({
              disabled: isUploading,
            })}
          />
          <CloudUpload className="text-muted-foreground" />
          {isDragActive ? (
            <p>Drop the PDF here ...</p>
          ) : (
            <p>
              <span className="font-semibold">Click to select PDF,</span>
              <span className="text-muted-foreground">
                {" "}
                or Drag &apos;n drop here
              </span>
            </p>
          )}
          {acceptedFiles && acceptedFiles[0] && (
            <div className="flex flex-row gap-2 rounded border border-stone-200 bg-white p-2 font-light backdrop-blur-lg">
              <File className="h-5 w-5 text-muted-foreground" />
              <p className="w-40 truncate">{acceptedFiles[0].name}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Dropzone;
