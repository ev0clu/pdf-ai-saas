import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { prisma } from "../../../../prisma/prisma";
import type { Message } from "@/types/message";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const fileId = searchParams.get("file");

    if (!fileId)
      return NextResponse.json(
        {
          message: "File not found",
        },
        { status: 500 },
      );

    const messages = (await prisma.message.findMany({
      where: {
        documentId: fileId,
      },
    })) as Message[] | [];

    return NextResponse.json(
      {
        messages,
        message: "All Messages records are returned",
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
