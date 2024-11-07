import { auth } from "@/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import type { UploadedFileData } from "uploadthing/types";

const f = createUploadthing();

const middleware = async () => {
  const session = await auth();

  // If you throw, the user will not be able to upload
  if (!session?.user) throw new UploadThingError("Unauthorized");

  // Whatever is returned here is accessible in onUploadComplete as `metadata`
  return { userEmail: session.user.email };
};

const onUploadComplete = async ({
  metadata,
  file,
}: {
  metadata: Awaited<ReturnType<typeof middleware>>;
  file: UploadedFileData;
}) => {
  // This code RUNS ON YOUR SERVER after upload
  //console.log("Upload complete for userEmail:", metadata.userEmail);
  console.log("file url", file);

  // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
  return { uploadedBy: metadata.userEmail };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  freePlanPdfUpload: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 1, minFileCount: 1 },
  })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),

  proPlanPdfUpload: f({
    pdf: { maxFileSize: "16MB", maxFileCount: 1, minFileCount: 1 },
  })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
