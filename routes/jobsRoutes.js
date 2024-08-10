import { Router } from "express";
import { createJob, getAllJobs, getJob, deleteJob, updateJob} from "../controllers/jobsController.js";

const jobsRouter = Router();

jobsRouter.route('/').get(getAllJobs).post(createJob);
jobsRouter.route('/:id').get(getJob).put(updateJob).delete(deleteJob)

export default jobsRouter;