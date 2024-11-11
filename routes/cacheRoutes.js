import express from "express";
import config from "../config.js";
import { testConnection } from "../controllers/cacheController.js";

const cacheRoutes = express.Router();
cacheRoutes.route(config.CACHE_ENDPOINT).post(testConnection);

export default cacheRoutes;
