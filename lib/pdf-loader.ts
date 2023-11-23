import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { env } from "./config";

export async function getChunkedDocsFromPdf() {
  try {
    const loader = new PDFLoader("docs/resume.pdf");

    const docs = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const chunkedDocs = textSplitter.splitDocuments(docs);

    return chunkedDocs;
  } catch (e) {
    console.log(e);
    console.log("Failed to load pdf");
  }
}
