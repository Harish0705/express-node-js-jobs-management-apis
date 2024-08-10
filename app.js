import express from "express";
import "dotenv/config";
import "express-async-errors"; // handle errors
import { connectDB } from "./db/dbconnect.js";
import { notFound } from "./middlewares/not-found.js";
import { errorHandlerMiddleware } from "./middlewares/error-handler.js";
import { authRouter } from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

// routes
app.use('/api/v1/jobs',authRouter)

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
