import { Job } from "../models/jobSchema.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

export const getAllJobs = async (req, res) => {
  res.status(StatusCodes.OK).send();
};

export const createJob = async (req, res) => {
  if(!req.user) throw new BadRequestError ("User details is missing")
  req.body.createdBy = req.user.userId
  console.log(req.user.userId)
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).send({job});
};
