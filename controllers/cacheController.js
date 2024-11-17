import { StatusCodes } from "http-status-codes";
import { createClient } from "redis";
import config from "../config.js";

const client = createClient({
  password: config.REDIS_PASSWORD,
  socket: {
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
  },
});

/**
 * Puts a summary into Redis.
 * @param {import("express").Request} req The request object from Express.js
 * @param {import("express").Response} res The response object from Express.js
 * @returns {Promise<void>}
 */
export const putSummary = async (req, res) => {
  try {
    await client.connect();
    const { id, text } = req.body;
    await client.set(id, text);
    res.status(StatusCodes.OK).json({ text: "Summary stored in Redis" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ text: "Unable to connect to Redis", error: error.message });
  } finally {
    client.disconnect();
  }
};

/**
 * Retrieves a summary from Redis.
 * @param {import("express").Request} req The request object from Express.js
 * @param {import("express").Response} res The response object from Express.js
 * @returns {Promise<void>}
 */
export const getSummary = async (req, res) => {
  try {
    await client.connect();
    const { id } = req.body;
    const summary = await client.get(id);

    if (summary) {
      res.status(StatusCodes.OK).json({ summary });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: "Summary not found" });
    }
  } catch (error) {
    console.error("Error retrieving summary:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Unable to retrieve summary", details: error.message });
  } finally {
    client.disconnect();
  }
};
