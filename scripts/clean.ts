import { namespaces } from "@/constants/namespace";
import { getPineconeClient } from "@/lib/pinecone";

async function cleanIndexNamespaces() {
  const client = await getPineconeClient();

  const index = client.Index("subjects");

  try {
    for (const namespace of namespaces) {
      const ns = index.namespace(namespace.name);

      await ns.deleteAll();

      console.log("Successfully deleted namespace", namespace.name);
    }
  } catch (e) {
    console.log(e);
    console.log("Error cleaning namespace");
  }
}

cleanIndexNamespaces();
