import { User } from "../models/userSchema.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req?.body;
  if (!name || !email || !password)
    throw new BadRequestError("Please provide the required fields");
  await User.create({ name, email, password });
  return res
    .status(StatusCodes.OK)
    .json({ msg: "Successfully registered. Please log in to continue" });
};

export const loginUser = async (req, res) => {
  const { email, password } = req?.body;
  if (!email || !password)
    throw new BadRequestError("Please provide the required fields");
  const user = await User.findOne({ email });
  if (!user) throw new UnauthenticatedError("Invalid user credentials");

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) throw new UnauthenticatedError("Incorrect password");
  const token = user.creatJwtToken();
  return res.status(StatusCodes.OK).json({ jsonToken: token });
};
