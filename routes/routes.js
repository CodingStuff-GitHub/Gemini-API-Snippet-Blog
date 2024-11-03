import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import config from "../config.js";
import { StatusCodes } from "http-status-codes";
import { createClient } from "redis";

const routes = express.Router();
const genAI = new GoogleGenerativeAI(config.GEMINI_KEY);
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

// Cache Endpoint
routes.post(config.CACHE_ENDPOINT, async (req, res) => {
  const client = createClient({
    password: config.REDIS_PASSWORD,
    socket: {
      host: config.REDIS_HOST,
      port: config.REDIS_PORT,
    },
  });

  try {
    await client.connect();
    res.status(StatusCodes.OK).json({ text: "Connected to Redis" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ text: "Unable to connect to Redis", error: error.message });
  } finally {
    client.disconnect();
  }
});

export default routes;
