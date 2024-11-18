type Author = "USER" | "AI";

export type Message = {
  id: string;
  documentId: string;
  author: Author;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AllMessagesResponse = {
  messages: Message[];
  message: string;
};
