import express from "express";
import "dotenv/config";
import "express-async-errors"; // handle errors
import { connectDB } from "./db/dbconnect.js";
import {
  notFound,
  errorHandlerMiddleware,
  authMiddleware,
} from "./middlewares/index.js";
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";

const app = express();

app.use(express.json());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMiddleware, jobsRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Database Connected");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error.message);
  }
};

start();
