import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";
import type { Document } from "@/types/document";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ fileid: string }> },
) {
  try {
    const fileId = (await params).fileid;

    const document = (await prisma.document.findUnique({
      where: {
        id: fileId,
      },
    })) as Document | null;

    return NextResponse.json(
      {
        document,
        message: "Document all records are returned",
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ fileid: string }> },
) {
  try {
    const fileId = (await params).fileid;

    const documents = await prisma.document.delete({
      where: {
        id: fileId,
      },
    });

    return NextResponse.json(
      {
        documents,
        message: "PDF document has been deleted",
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      },
      { status: 500 },
    );
  }
}
