import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import config from "../config.js";
import { StatusCodes } from "http-status-codes";

const routes = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Summarize Endpoint
routes.post(config.SUMMARIZE_ENDPOINT, async (req, res) => {
  try {
    const prompt = req.body.text;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    res.status(StatusCodes.OK).json({ text });
  } catch (error) {
    console.error(error || "Error data not found.");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Summary Generation Failed." });
  }
});

export default routes;
