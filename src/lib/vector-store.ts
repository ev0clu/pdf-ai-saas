import type { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import {
  AIMessage,
  HumanMessage,
  type BaseMessage,
} from "@langchain/core/messages";
import { env } from "@/lib/env";
import type { Message } from "@/types/message";

let embeddingsClient: OpenAIEmbeddings | null = null;
let chatClient: ChatOpenAI | null = null;

async function initEmbeddingsClient() {
  try {
    const embeddingsClient = new OpenAIEmbeddings({
      model: "text-embedding-3-small",
      apiKey: env.OPENAI_API_KEY,
    });

    return embeddingsClient;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

async function initChatClient() {
  try {
    const chatClient = new ChatOpenAI({
      model: "gpt-4o",
      temperature: 0,
      apiKey: env.OPENAI_API_KEY,
    });

    return chatClient;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

async function getVectorStore(pineconeClient: Pinecone, namespace?: string) {
  try {
    if (!embeddingsClient) {
      embeddingsClient = await initEmbeddingsClient();
    }

    const pineconeIndex = pineconeClient.Index(env.PINECONE_INDEX);
    const vectorStore = await PineconeStore.fromExistingIndex(
      embeddingsClient,
      {
        pineconeIndex,
        namespace,
      },
    );

    return vectorStore;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function addToVectorStore(
  pineconeClient: Pinecone,
  // @ts-expect-error docs type error
  docs: Document<Record<string, any>>[],
  namespace: string,
) {
  try {
    const vectorStore = await getVectorStore(pineconeClient);
    await vectorStore.addDocuments(docs, { namespace });
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function deleteFromVectorStore(
  pineconeClient: Pinecone,
  namespace: string,
) {
  try {
    const vectorStore = await getVectorStore(pineconeClient);
    await vectorStore.delete({ deleteAll: true, namespace });
  } catch (error) {
    throw new Error(`${error}`);
  }
}

function formatChatHistoryMessages(messages: Message[]): BaseMessage[] {
  const chatHistory = messages.map((message) => {
    if (message.author === "USER") {
      return new HumanMessage(message.text);
    }
    if (message.author === "AI") {
      return new AIMessage(message.text);
    }
  }) as BaseMessage[];
  return chatHistory;
}

export async function getConversationalRagChainWithHistory(
  pineconeClient: Pinecone,
  namespace: string,
  text: string,
  messages: Message[],
) {
  try {
    const vectorStore = await getVectorStore(pineconeClient, namespace);
    //const similaritySearchResult = await vectorStore.similaritySearch(query, 1);
    const retriever = vectorStore.asRetriever();

    if (!chatClient) {
      chatClient = await initChatClient();
    }

    // Contextualize question - Chat history
    const contextualizeQuestionSystemPrompt =
      "Given a chat history and the latest user question " +
      "which might reference context in the chat history, " +
      "formulate a standalone question which can be understood " +
      "without the chat history. Do NOT answer the question, " +
      "just reformulate it if needed and otherwise return it as is.";

    const contextualizeQuestionPrompt = ChatPromptTemplate.fromMessages([
      ["system", contextualizeQuestionSystemPrompt],
      new MessagesPlaceholder("chat_history"),
      ["human", "{input}"],
    ]);

    const historyAwareRetriever = await createHistoryAwareRetriever({
      llm: chatClient,
      retriever: retriever,
      rephrasePrompt: contextualizeQuestionPrompt,
    });

    // Answer question
    const systemPrompt =
      "You are an assistant for question-answering tasks. " +
      "Use the following pieces of retrieved context to answer " +
      "the question. If you don't know the answer, say that you " +
      "don't know. Use three sentences maximum and keep the " +
      "answer concise." +
      "\n\n" +
      "{context}";

    const questionAnswerPrompt = ChatPromptTemplate.fromMessages([
      ["system", systemPrompt],
      new MessagesPlaceholder("chat_history"),
      ["human", "{input}"],
    ]);

    const questionAnswerChain = await createStuffDocumentsChain({
      llm: chatClient,
      prompt: questionAnswerPrompt,
    });

    const ragChain = await createRetrievalChain({
      retriever: historyAwareRetriever,
      combineDocsChain: questionAnswerChain,
    });

    const results = await ragChain.invoke({
      input: text,
      chat_history: formatChatHistoryMessages(messages),
    });

    return results;

    // Statefully manage chat history
    /* function getSessionHistory(sessionId: string): BaseChatMessageHistory {
      if (!(sessionId in store)) {
        store[sessionId] = new ChatMessageHistory();
      }
      return store[sessionId];
    }

    const conversationalRagChain = new RunnableWithMessageHistory({
      runnable: ragChain,
      getMessageHistory: getSessionHistory,
      inputMessagesKey: "input",
      historyMessagesKey: "chat_history",
      outputMessagesKey: "answer",
    });
    console.log(store);

    for await (const s of await conversationalRagChain.stream(
      { input: text },
      { configurable: { sessionId: "unique_session_id" } },
    )) {
      // console.log(s);
      // console.log("----");
    }
    return conversationalRagChain;*/
  } catch (error) {
    throw new Error(`${error}`);
  }
}
