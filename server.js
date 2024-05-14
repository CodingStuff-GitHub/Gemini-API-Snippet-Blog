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

const corsOptions = {
  origin: process.env.FRONTEND,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

app.post("/summarize", async (req, res) => {
  try {
    const prompt = req.body.text;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    res.status(200).json({ text });
  } catch (error) {
    console.error(error || "Error data not found.");
    res.status(500).json({ error: "Summary Generation Failed." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
