import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { fileid: string } },
) {
  try {
    const fileId = params.fileid;

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
