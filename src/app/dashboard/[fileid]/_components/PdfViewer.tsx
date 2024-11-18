"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { pdfjs, Document, Page } from "react-pdf";
import type { PDFDocumentProxy } from "pdfjs-dist";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import type {
  DocumentResponse,
  Document as PdfDocument,
} from "@/types/document";
import { Loader } from "@/components/Loader";
import { toast } from "sonner";
import ScrollAreaWrapper from "@/components/ScrollAreaWrapper";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

interface PdfViewerProps {
  id: string;
}

const PdfViewer = ({ id }: PdfViewerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [numPages, setNumPages] = useState<number>();
  const [width, setWidth] = useState<number>(300);

  const { data: document, error } = useQuery({
    queryKey: ["file", id],
    queryFn: async (): Promise<PdfDocument | null> => {
      const response = await fetch(`/api/file/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = (await response.json()) as DocumentResponse;

      return result.document;
    },
  });

  useEffect(() => {
    const updateSize = () => {
      if (ref.current) setWidth(ref.current.offsetWidth);
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  if (error) return <p className="w-1/2">{error.message}</p>;

  return (
    <ScrollAreaWrapper>
      <Document
        inputRef={ref}
        file={document?.url}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={() => {
          toast.error("Error loading PDF");
        }}
        loading={<Loader />}
        noData={<Loader />}
        options={options}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            loading={""}
            width={width}
          />
        ))}
      </Document>
    </ScrollAreaWrapper>
  );
};

export default PdfViewer;
