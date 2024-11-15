import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import type { Document } from "@/types/document";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();

    const documents = (await prisma.document.findMany({
      where: {
        userId: session?.user.id,
      },
    })) as Document[] | [];

    return NextResponse.json(
      {
        documents,
        message: "All documents records are returned",
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
