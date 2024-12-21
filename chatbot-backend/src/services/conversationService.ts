import * as conversationRepository from "../repositories/conversationRepository";

export const getConversations = async () => {
  return conversationRepository.getAllConversations();
};

export const createNewConversation = async (name: string) => {
  return conversationRepository.createConversation(name);
};

export const getMessagesForConversation = async (id: number) => {
  return conversationRepository.getMessagesByConversationId(id);
};

export const removeConversation = async (id: number) => {
  return conversationRepository.deleteConversation(id);
};

export const addMessageToConversation = async (
  text: string,
  sender: string,
  conversationId: number
) => {
  return conversationRepository.createMessage(text, sender, conversationId);
};
