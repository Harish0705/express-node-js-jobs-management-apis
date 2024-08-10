import { Router } from "express";
import { createJob, getAllJobs } from "../controllers/jobsController.js";

const jobsRouter = Router();

jobsRouter.route('/').get(getAllJobs).post(createJob);

export default jobsRouter;