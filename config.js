import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "config.env" });
}

const DEFAULT_PORT = 3000;
const config = {
  PORT: process.env.PORT || DEFAULT_PORT,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_PORT: process.env.REDIS_PORT,
  GEMINI_KEY: process.env.GEMINI_KEY,
  FRONTEND: process.env.FRONTEND,
  SUMMARIZE_ENDPOINT: "/summarize",
  CACHE_ENDPOINT: "/cache",
};

export default config;
