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

export type DocumentPOSTresponse = {
  documents: Document[];
  message: string;
};
