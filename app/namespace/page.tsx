import { getPineconeClient } from "@/lib/pinecone";

export const revalidate = 0;

export default async function page() {
  const client = await getPineconeClient();

  const namespaces = (await client.Index("subjects").describeIndexStats())
    .namespaces;

  console.log(namespaces);

  return <div>page</div>;
}
