import express from "express";
import cors from "cors";
import routes from "./routes.js";
import geminiRoutes from "./routes/geminiRoutes.js";
import cacheRoutes from "./routes/cacheRoutes.js";

const app = express();
const corsOptions = {
  origin: process.env.FRONTEND,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", routes);
app.use("/api", geminiRoutes);
app.use("/api", cacheRoutes);

export default app;
