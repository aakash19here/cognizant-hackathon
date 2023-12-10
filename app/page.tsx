import { getPineconeClient } from "@/lib/pinecone";
import Link from "next/link";

export const revalidate = 0;

export default async function page() {
  const client = await getPineconeClient();

  const namespaces = (await client.Index("subjects").describeIndexStats())
    .namespaces;

  return (
    <p>
      {namespaces &&
        Object.keys(namespaces).map((namespace, i) => (
          <Link
            href={`/chat/${namespace}`}
            key={i}
            className="flex justify-between"
          >
            {namespace}
          </Link>
        ))}
    </p>
  );
}
