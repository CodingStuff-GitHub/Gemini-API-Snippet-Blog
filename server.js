import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import config from "./config";
import routes from "./routes/routes.js";

process.on("uncaughtException", (err) => {
  console.log(`Error : ${err}`);
  console.log("Shutting Down the server due to uncaughtException");
  process.exit(1);
});

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "config.env" });
}
const app = express();
const port = process.env.PORT || config.DEFAULT_PORT;

const corsOptions = {
  origin: process.env.FRONTEND,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
