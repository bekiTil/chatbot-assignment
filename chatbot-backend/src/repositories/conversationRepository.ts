import prisma from "../models/prismaClient";

export const getAllConversations = async () => {
  return prisma.conversation.findMany({
    include: { messages: true },
  });
};

export const createConversation = async (name: string) => {
  return prisma.conversation.create({
    data: {
      name,
      messages: {
        create: [{ text: "How can I help you?", sender: "bot" }],
      },
    },
  });
};

export const getConversationById = async (id: number) => {
  return prisma.conversation.findUnique({
    where: { id },
    include: { messages: true },
  });
};

export const deleteConversation = async (id: number) => {
  return prisma.conversation.delete({ where: { id } });
};

export const createMessage = async (text: string, sender: string, conversationId: number) => {
  return prisma.message.create({
    data: {
      text,
      sender,
      conversationId,
    },
  });
};

export const getMessagesByConversationId = async (conversationId: number) => {
  return prisma.message.findMany({
    where: {
      conversationId: conversationId,
    },
    orderBy: {
      createdAt: "asc",  
    },
  });
};
