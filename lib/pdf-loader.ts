import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function getChunkedDocsFromPdf(path: string) {
  try {
    const loader = new PDFLoader(path);

    const docs = await loader.load();

    if (!docs || docs.length === 0) {
      throw new Error("No documents were loaded from the PDF.");
    }

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 100,
    });

    const chunkedDocs = textSplitter.splitDocuments(docs);

    return chunkedDocs;
  } catch (e) {
    console.log(e);
    console.log("Failed to load pdf");
  }
}
