import { Request, Response } from "express";
import { Job } from "../models/jobSchema.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    userName: string;
  };
}

export const getAllJobs = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) throw new BadRequestError("User details is missing");
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs });
};

export const createJob = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) throw new BadRequestError("User details is missing");
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).send({ job });
};

export const getJob = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) throw new BadRequestError("User details is missing");
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({ createdBy: userId, _id: jobId });
  if (!job) throw new NotFoundError(`No job found for: ${jobId}`);
  res.status(StatusCodes.OK).json({ job });
};

export const deleteJob = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) throw new BadRequestError("User details is missing");
  const {
    user: { userId },
    params: { id: jobId },
    body = {},
  } = req;

  const job = await Job.findOneAndDelete({
    createdBy: userId,
    _id: jobId,
    ...body,
  });
  if (!job) throw new NotFoundError(`No job found for: ${jobId}`);
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) throw new BadRequestError("User details is missing");
  const {
    user: { userId },
    params: { id: jobId },
    body = {},
  } = req;
  const { company, role } = body;

  if (!company || !role)
    throw new NotFoundError("Company and role are missing");

  const job = await Job.findOneAndUpdate(
    { createdBy: userId, _id: jobId },
    body,
    { new: true, runValidators: true }
  );
  if (!job) throw new NotFoundError(`No job found for: ${jobId}`);
  res.status(StatusCodes.OK).json({ job });
};