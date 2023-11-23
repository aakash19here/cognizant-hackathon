import { z } from "zod";

export const envSchema = z.object({
  PINECONE_API_KEY: z.string().trim().min(1),
  OPEN_AI_API_KEY: z.string().trim().min(1),
  PINECONE_ENVIRONMENT: z.string().trim().min(1),
});

export const env = envSchema.parse(process.env);
