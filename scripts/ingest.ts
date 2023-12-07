import { getChunkedDocsFromPdf } from "@/lib/pdf-loader";
import { embedAndStoreDocs } from "@/lib/vector-store";
import { getPineconeClient } from "@/lib/pinecone";
import { namespaces } from "@/constants/namespace";

// This operation might fail because indexes likely need
// more time to init, so give some 5 mins after index
// creation and try again.
(async () => {
  try {
    const pineconeClient = await getPineconeClient();

    for (const namespace of namespaces) {
      console.log(`Preparing chunks from PDF file ${namespace.path}`);
      const docs = await getChunkedDocsFromPdf(namespace.path);
      console.log(
        //@ts-expect-error
        `Loading ${docs.length} chunks into pinecone for namespace ${namespace.name}...`
      );
      //@ts-expect-error
      await embedAndStoreDocs(pineconeClient, docs, namespace.name);
      console.log(
        `Data for namespace ${namespace.name} embedded and stored in pine-cone index`
      );
    }
  } catch (error) {
    console.error("Init client script failed ", error);
  }
})();
