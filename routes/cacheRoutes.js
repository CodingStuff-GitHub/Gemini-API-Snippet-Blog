import express from "express";
import config from "../config.js";
import { putSummary, getSummary } from "../controllers/cacheController.js";

const cacheRoutes = express.Router();
cacheRoutes.route(config.GET_SUMMARY_ENDPOINT).get(getSummary);
cacheRoutes.route(config.POST_SUMMARY_ENDPOINT).post(putSummary);

export default cacheRoutes;
