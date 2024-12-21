import { Request, Response } from "express";
import * as conversationService from "../services/conversationService";

export const getConversations = async (req: Request, res: Response) => {
  const conversations = await conversationService.getConversations();
  res.json(conversations);
};

export const createConversation = async (req: Request, res: Response) => {
  const { name } = req.body;
  const newConversation = await conversationService.createNewConversation(name);
  res.status(201).json(newConversation);
};

export const getMessages = async (req: Request, res: Response) => {
  const { id } = req.params;
  const messages = await conversationService.getMessagesForConversation(Number(id));
  res.json(messages);
};

export const deleteConversation = async (req: Request, res: Response) => {
  const { id } = req.params;
  await conversationService.removeConversation(Number(id));
  res.status(204).send();
};

export const sendMessage = async (req: Request, res: Response) => {
  const { text, sender, conversationId } = req.body;
  const message = await conversationService.addMessageToConversation(
    text,
    sender,
    conversationId
  );
  res.status(201).json(message);
};
