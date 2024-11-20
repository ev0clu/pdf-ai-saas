import { z } from "zod";

const envSchema = z.object({
  AUTH_SECRET: z.string().trim().min(1),
  AUTH_GOOGLE_ID: z.string().trim().min(1),
  AUTH_GOOGLE_SECRET: z.string().trim().min(1),
  DATABASE_URL: z.string().trim().min(1),
  UPLOADTHING_TOKEN: z.string().trim().min(1),
  PINECONE_API_KEY: z.string().trim().min(1),
  PINECONE_INDEX: z.string().trim().min(1),
  OPENAI_API_KEY: z.string().trim().min(1),
});

export const env = envSchema.parse(process.env);
