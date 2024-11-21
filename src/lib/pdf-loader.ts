import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function getChunckedDocsFromPDF(url: string) {
  const blob = await fetch(url).then((res) => res.blob());

  const loader = new PDFLoader(blob);
  const pdf = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const docs = await textSplitter.splitDocuments(pdf);

  return docs;
}
