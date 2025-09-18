import { Request, Response } from "express";
import { NotFoundError } from "../errors/index.js";

const notFound = (req: Request, res: Response): void => {
  throw new NotFoundError("Page does not exists");
};

export default notFound;