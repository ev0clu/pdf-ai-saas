export type Document = {
  id: string;
  userId: string;
  name: string;
  size: number;
  type: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
};

export type DocumentResponse = {
  document: Document;
  message: string;
};

export type AllDocumentResponse = {
  documents: Document[];
  message: string;
};
