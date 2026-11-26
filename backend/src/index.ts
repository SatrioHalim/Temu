import express from "express";
import bodyParser from "body-parser";
import router from "./routes/api";
import "dotenv/config";
import connectDB from "./utils/database";
import docs from "./docs/route";
import cors from "cors";

async function init() {
  try {
    const result = await connectDB();
    console.log("Database connection status:", result);

    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(cors());
    app.use(bodyParser.json());

    app.get("/", (req, res) => {
      res.status(200).json({
        message: "Temu API service is running",
        app_name: process.env.APP_NAME || "Temu API",
        app_version: process.env.APP_VERSION || "1.0.0",
        data: null,
      });
    });

    app.use("/api", router);
    docs(app);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`App Name : ${process.env.APP_NAME}`);
      console.log(`App Version : ${process.env.APP_VERSION}`);
    });
  } catch (error) {
    console.log("Error starting the server:", error);
  }
}

init();
