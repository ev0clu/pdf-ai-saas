"use client";

import { File, FileUp } from "lucide-react";
import { useCallback } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";

const Dropzone = () => {
  const onDropRejected = useCallback((rejectedFiles: FileRejection[]) => {
    toast.error(
      `${rejectedFiles[0].file.type.split("/")[1].toUpperCase()} does not supported`,
    );
  }, []);

  const onError = (error: Error) => {
    toast.error(error.message);
  };

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDropRejected,
      onError,
      accept: { "application/pdf": [".pdf"] },
      multiple: false,
    });

  return (
    <div className="flex h-52 w-full items-center justify-center rounded-lg bg-white p-10 shadow-lg md:h-60 md:w-96">
      <div
        {...getRootProps()}
        className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-rose-500/50 bg-rose-50/50 p-10 text-center text-sm hover:cursor-pointer hover:border-rose-500 hover:bg-rose-50"
      >
        <input {...getInputProps()} />
        <FileUp className="text-muted-foreground" />
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
    </div>
  );
};

export default Dropzone;
