import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    userName: string;
  };
}

const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Invalid Authorization request");
  }
  const authToken = authorizationHeader.split(" ")[1];
  if (!authToken) {
    throw new UnauthenticatedError("Token not provided");
  }
  
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new UnauthenticatedError("JWT secret not configured");
  }
  
  try {
    const userPayload = jwt.verify(authToken, jwtSecret) as any;
    // attach the user to job routes
    req.user = { userId: userPayload.userdId, userName: userPayload.userName };
    next();
  } catch (err) {
    throw new UnauthenticatedError("Authentication failed");
  }
};

export default authMiddleware;