import { Pinecone } from "@pinecone-database/pinecone";
import { env } from "./env";

let pineconeClient: Pinecone | null = null;

async function createIndex(pineconeClient: Pinecone, indexName: string) {
  try {
    await pineconeClient.createIndex({
      name: indexName,
      dimension: 1536,
      metric: "cosine",
      spec: {
        serverless: {
          cloud: "aws",
          region: "us-east-1",
        },
      },
      deletionProtection: "disabled",
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
}

async function initPineconeClient() {
  try {
    pineconeClient = new Pinecone({
      apiKey: env.PINECONE_API_KEY,
    });

    const existingIndexes = (await pineconeClient.listIndexes()).indexes;

    if (
      !existingIndexes ||
      !existingIndexes.find((index) => index.name === env.PINECONE_INDEX)
    ) {
      createIndex(pineconeClient, env.PINECONE_INDEX);
      console.log(`${env.PINECONE_INDEX} index is created successfully`);
    } else {
      console.log(`${env.PINECONE_INDEX} index is already exist`);
    }

    return pineconeClient;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function getPineconeClient() {
  if (!pineconeClient) {
    pineconeClient = await initPineconeClient();
  }

  return pineconeClient;
}
