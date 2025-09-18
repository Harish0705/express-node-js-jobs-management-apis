import express from "express";
import "dotenv/config";
import "express-async-errors"; // handle errors
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";
import { connectDB } from "./db/dbconnect.js";
import {
  notFound,
  errorHandler,
  authMiddleware,
} from "./middlewares/index.js";
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";

const app = express();

app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMiddleware, jobsRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = async (): Promise<void> => {
  try {
    await connectDB(process.env.MONGO_URI as string);
    console.log("Database Connected");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error: any) {
    console.log(error.message);
  }
};

start();