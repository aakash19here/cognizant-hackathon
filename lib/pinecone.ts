import { Pinecone } from "@pinecone-database/pinecone";
import { env } from "@/lib/config";

let pineconeClientInstance: Pinecone | null = null;

async function initPineconeClient() {
  const client = new Pinecone({
    apiKey: env.PINECONE_API_KEY,
    environment: env.PINECONE_ENVIRONMENT,
  });

  return client;
}

export async function getPineconeClient() {
  if (!pineconeClientInstance) {
    pineconeClientInstance = await initPineconeClient();
  }

  return pineconeClientInstance;
}
