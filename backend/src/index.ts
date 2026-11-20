import express from "express";
import bodyParser from "body-parser";
import router from "./routes/api";
import "dotenv/config";
import connectDB from "./utils/database";

async function init() {
  try {
    const result = await connectDB();
    console.log("Database connection status:", result);

    const app = express();
    const PORT = 3000;

    app.use(bodyParser.json());

    app.use("/api", router);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error starting the server:", error);
  }
}

init();
