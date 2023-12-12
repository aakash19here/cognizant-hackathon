import NamespaceCard from "@/components/namespace-card";
import { getPineconeClient } from "@/lib/pinecone";
import Link from "next/link";

export const revalidate = 0;

export default async function page() {
  const client = await getPineconeClient();

  const namespaces = (await client.Index("subjects").describeIndexStats())
    .namespaces;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-4 gap-4">
        {namespaces &&
          Object.keys(namespaces).map((namespace, i) => (
            <Link
              href={`/chat/${namespace}`}
              key={i}
              className="flex justify-between"
            >
              <NamespaceCard namespace={namespace} />
            </Link>
          ))}
      </div>
    </div>
  );
}
