import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import conversationRoutes from "./routes/conversationRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/conversations", conversationRoutes);

export default app;
