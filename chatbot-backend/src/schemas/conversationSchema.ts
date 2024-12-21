import { z } from "zod";

export const createMessageSchema = z.object({
  text: z.string().min(1, "Message cannot be empty"),
  sender: z.enum(["user", "bot"]),
  conversationId: z.number().int(),
});

export const createConversationSchema = z.object({
  name: z.string().min(1, "Conversation name cannot be empty"),
});
