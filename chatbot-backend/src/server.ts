import app from "./app";
import dotenv from "dotenv";
import { setupSwagger } from "./swagger";

dotenv.config();

const PORT = process.env.PORT || 4000;

setupSwagger(app);

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
  console.log("Swagger Docs available at http://localhost:4000/api-docs");
});