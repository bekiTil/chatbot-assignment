import { Request, Response } from "express";
import * as conversationService from "../services/conversationService";


/**
 * @swagger
 * components:
 *   schemas:
 *     Conversation:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Chat with Support"
 *         messages:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Message'
 *     Message:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 101
 *         text:
 *           type: string
 *           example: "Hello, how can I help you?"
 *         sender:
 *           type: string
 *           example: "bot"
 *         conversationId:
 *           type: integer
 *           example: 1
 */


/**
 * @swagger
 * /api/conversations:
 *   get:
 *     summary: Retrieve all conversations
 *     description: Fetches a list of all available conversations.
 *     responses:
 *       200:
 *         description: A list of conversations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Conversation'
 */
export const getConversations = async (req: Request, res: Response) => {
  const conversations = await conversationService.getConversations();
  res.json(conversations);
};

/**
 * @swagger
 * /api/conversations:
 *   post:
 *     summary: Create a new conversation
 *     description: Creates a new conversation and returns the newly created conversation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New Conversation
 *     responses:
 *       201:
 *         description: Conversation created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conversation'
 */
export const createConversation = async (req: Request, res: Response) => {
  const { name } = req.body;
  const newConversation = await conversationService.createNewConversation(name);
  res.status(201).json(newConversation);
};

/**
 * @swagger
 * /api/conversations/{id}/messages:
 *   get:
 *     summary: Retrieve messages for a specific conversation
 *     description: Fetches all messages associated with a particular conversation.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the conversation to retrieve messages from.
 *     responses:
 *       200:
 *         description: List of messages for the conversation.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       404:
 *         description: Conversation not found.
 */
export const getMessages = async (req: Request, res: Response) => {
  const { id } = req.params;
  const messages = await conversationService.getMessagesForConversation(Number(id));
  res.json(messages);
};

/**
 * @swagger
 * /api/conversations/{id}:
 *   delete:
 *     summary: Delete a conversation
 *     description: Deletes a specific conversation by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the conversation to delete.
 *     responses:
 *       204:
 *         description: Conversation deleted successfully.
 *       404:
 *         description: Conversation not found.
 */
export const deleteConversation = async (req: Request, res: Response) => {
  const { id } = req.params;
  await conversationService.removeConversation(Number(id));
  res.status(204).send();
};

/**
 * @swagger
 * /api/conversations/message:
 *   post:
 *     summary: Send a message to a conversation
 *     description: Adds a new message to a specific conversation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: Hello!
 *               sender:
 *                 type: string
 *                 example: user
 *               conversationId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Message sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
export const sendMessage = async (req: Request, res: Response) => {
  const { text, sender, conversationId } = req.body;
  const message = await conversationService.addMessageToConversation(
    text,
    sender,
    conversationId
  );
  res.status(201).json(message);
};
