import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ms from "ms";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  creatJwtToken(): string;
  comparePassword(userPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Please provide user's name"],
    maxLength: 100,
    minLength: 2,
  },
  email: {
    type: String,
    required: [true, "Please provide user's email address"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email address",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 10,
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.creatJwtToken = function (): string {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  const options: jwt.SignOptions = {
    expiresIn: (process.env.JWT_LIFETIME || '1d') as ms.StringValue
  };
  return jwt.sign(
    { userdId: this._id, userName: this.name },
    process.env.JWT_SECRET,
    options
  );
};

userSchema.methods.comparePassword = async function (userPassword: string): Promise<boolean> {
  return await bcrypt.compare(userPassword, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);