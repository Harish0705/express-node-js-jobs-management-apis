import { Job } from "../models/jobSchema.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

export const getAllJobs = async (req, res) => {
  if (!req.user) throw new BadRequestError("User details is missing");
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs });
};

export const createJob = async (req, res) => {
  if (!req.user) throw new BadRequestError("User details is missing");
  req.body.createdBy = req.user.userId;
  console.log(req.user.userId);
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).send({ job });
};

export const getJob = async (req, res) => {
  if (!req.user) throw new BadRequestError("User details is missing");
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({createdBy: userId, _id:jobId})
  if(!job) throw new NotFoundError(`No job found for: ${jobId}`)
  return res.status(StatusCodes.OK).json({job})
};
