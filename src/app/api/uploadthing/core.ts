import { auth } from "@/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import type { UploadedFileData } from "uploadthing/types";
import { prisma } from "../../../../prisma/prisma";
import { getPineconeClient } from "@/lib/pinecone";
import { getChunckedDocsFromPDF } from "@/lib/pdf-loader";
import { addToVectorStore } from "@/lib/vector-store";

const f = createUploadthing();

const middleware = async () => {
  const session = await auth();

  // If you throw, the user will not be able to upload
  if (!session?.user || !session.user.id)
    throw new UploadThingError("Unauthorized");

  // Whatever is returned here is accessible in onUploadComplete as `metadata`
  return { userId: session.user.id };
};

const onUploadComplete = async ({
  metadata,
  file,
}: {
  metadata: Awaited<ReturnType<typeof middleware>>;
  file: UploadedFileData;
}) => {
  // This code RUNS ON YOUR SERVER after upload
  const document = await prisma.document.create({
    data: {
      userId: metadata.userId,
      name: file.name,
      size: file.size,
      type: file.type,
      url: file.url,
      key: file.key,
    },
  });

  const chunkedDocs = await getChunckedDocsFromPDF(file.url);

  const pineconeClient = await getPineconeClient();

  await addToVectorStore(pineconeClient, chunkedDocs, document.id);

  // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
  return { docUrl: file.url, docId: document.id };
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
