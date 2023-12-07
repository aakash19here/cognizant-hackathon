import { getPineconeClient } from "@/lib/pinecone";
import Chat from "./_components/client";

type Params = {
  params: {
    namespace: string;
  };
};

export default async function Namespace({ params: { namespace } }: Params) {
  const client = await getPineconeClient();

  const namespaces = await client.Index("subjects").describeIndexStats();

  console.log("fetched namespaces ", namespaces);

  return (
    <div>
      <Chat namespace={namespace} />
    </div>
  );
}
