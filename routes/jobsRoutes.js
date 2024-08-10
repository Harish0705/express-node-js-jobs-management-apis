import { Router } from "express";
import { createJob, getAllJobs, getJob } from "../controllers/jobsController.js";

const jobsRouter = Router();

jobsRouter.route('/').get(getAllJobs).post(createJob);
jobsRouter.route('/:id').get(getJob)

export default jobsRouter;