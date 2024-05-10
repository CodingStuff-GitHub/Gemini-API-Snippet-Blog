import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

process.on("uncaughtException", (err) => {
  console.log(`Error : ${err}`);
  console.log("Shutting Down the server due to uncaughtException");
  process.exit(1);
});

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "config.env" });
}
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

console.log("Starting to summarize : " + process.env.GEMINI_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
console.log("Created the gen Model");

app.post("/summarize", async (req, res) => {
  try {
    const prompt = req.body.text;
    console.log("Request: " + req.body.text);
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    res.json({ text });
  } catch (error) {
    console.error(error.response.data || "Error data not found.");
    res.status(500).json({ error: "Summary Generation Failed." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
