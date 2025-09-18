import mongoose from "mongoose";

export const connectDB = async (url: string): Promise<typeof mongoose> => {
  return mongoose.connect(url);
};