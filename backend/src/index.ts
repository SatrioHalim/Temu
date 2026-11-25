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
    const PORT = process.env.PORT || 3000;

    app.use(bodyParser.json());

    app.get("/", (req, res) => {
      res.status(200).json({
        message: "Temu API service is running",
        data: null,
      });
    });

    app.use("/api", router);

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
