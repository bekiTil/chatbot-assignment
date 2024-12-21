import express from "express";
import * as conversationController from "../controllers/conversationController";
import { validate } from "../middlewares/validateMiddleware";
import { createConversationSchema, createMessageSchema } from "../schemas/conversationSchema";

const router = express.Router();

router.get("/", conversationController.getConversations);
router.post("/", validate(createConversationSchema), conversationController.createConversation);
router.get("/:id/messages", conversationController.getMessages);
router.delete("/:id", conversationController.deleteConversation);
router.post("/message", validate(createMessageSchema), conversationController.sendMessage);

export default router;
