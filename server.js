import app from "./app.js";
import config from "./config.js";

process.on("uncaughtException", (err) => {
  console.log(`Error : ${err}`);
  console.log("Shutting Down the server due to uncaughtException");
  process.exit(1);
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
