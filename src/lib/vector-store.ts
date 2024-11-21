import type { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { env } from "@/lib/env";

let embeddingsClient: OpenAIEmbeddings | null = null;

async function initEmbeddingsClient() {
  try {
    const embeddingsClient = new OpenAIEmbeddings({
      model: "text-embedding-3-small",
      apiKey: env.OPENAI_API_KEY,
    });

    return embeddingsClient;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

async function getVectorStore(pineconeClient: Pinecone, namespace?: string) {
  try {
    if (!embeddingsClient) {
      embeddingsClient = await initEmbeddingsClient();
    }

    const pineconeIndex = pineconeClient.Index(env.PINECONE_INDEX);
    const vectorStore = await PineconeStore.fromExistingIndex(
      embeddingsClient,
      {
        pineconeIndex,
        namespace,
      },
    );

    return vectorStore;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function addToVectorStore(
  pineconeClient: Pinecone,
  // @ts-expect-error docs type error
  docs: Document<Record<string, any>>[],
  namespace: string,
) {
  try {
    const vectorStore = await getVectorStore(pineconeClient);
    await vectorStore.addDocuments(docs, { namespace });
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function deleteFromVectorStore(
  pineconeClient: Pinecone,
  namespace: string,
) {
  try {
    const vectorStore = await getVectorStore(pineconeClient);
    await vectorStore.delete({ deleteAll: true, namespace });
  } catch (error) {
    throw new Error(`${error}`);
  }
}
