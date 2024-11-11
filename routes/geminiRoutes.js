import express from "express";
import config from "../config.js";
import { summarize } from "../controllers/geminiController.js";

const geminiRoutes = express.Router();
geminiRoutes.route(config.CACHE_ENDPOINT).post(summarize);

export default geminiRoutes;
