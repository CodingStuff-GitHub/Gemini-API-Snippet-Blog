import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "../config.js";
import { StatusCodes } from "http-status-codes";

const genAI = new GoogleGenerativeAI(config.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

/**
 * Handles HTTP POST requests to the summarize endpoint.
 * @param {Object} req The request object from Express.js
 * @param {Object} res The response object from Express.js
 * @returns {Promise<void>}
 */
export const summarize = async (req, res) => {
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
};
