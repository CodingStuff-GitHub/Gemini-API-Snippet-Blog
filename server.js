import express from "express";
import cors from "cors";
import config from "./config.js";
import routes from "./routes/routes.js";

process.on("uncaughtException", (err) => {
  console.log(`Error : ${err}`);
  console.log("Shutting Down the server due to uncaughtException");
  process.exit(1);
});

const app = express();
const corsOptions = {
  origin: process.env.FRONTEND,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", routes);

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
