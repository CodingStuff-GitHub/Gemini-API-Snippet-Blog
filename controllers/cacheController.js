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
 * Tests the connection to Redis.
 * @param {*} _req The request object from Express.js
 * @param {*} res The response object from Express.js
 * @returns {Promise<void>}
 */
export const testConnection = async (_req, res) => {
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
};
