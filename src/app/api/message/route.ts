import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import type { Message, PostMessage } from "@/types/message";
import { getConversationalRagChainWithHistory } from "@/lib/vector-store";
import { getPineconeClient } from "@/lib/pinecone";

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

export async function POST(req: NextRequest) {
  try {
    const { documentId, text, messages } = (await req.json()) as PostMessage;

    (await prisma.message.create({
      data: {
        documentId: documentId,
        author: "USER",
        text: text,
      },
    })) as Message;

    const pineconeClient = await getPineconeClient();

    const conversationalRagChain = await getConversationalRagChainWithHistory(
      pineconeClient,
      documentId,
      text,
      messages,
    );

    (await prisma.message.create({
      data: {
        documentId: documentId,
        author: "AI",
        text: conversationalRagChain.answer,
      },
    })) as Message;

    return NextResponse.json(
      {
        message: "Post Message successfully",
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
