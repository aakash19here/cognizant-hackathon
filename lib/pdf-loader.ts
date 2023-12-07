import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function getChunkedDocsFromPdf(path: string) {
  try {
    const loader = new PDFLoader(path);

    const docs = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 100,
      // chunkSize: 256,
      // chunkOverlap: 20,
    });

    const chunkedDocs = textSplitter.splitDocuments(docs);

    return chunkedDocs;
  } catch (e) {
    console.log(e);
    console.log("Failed to load pdf");
  }
}
