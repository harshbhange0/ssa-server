import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse";
import jwt from "jsonwebtoken";

export async function authCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return apiResponse(res, "No Auth Token Found", 404);
    }
    const jwtS = process.env.JWT_SECRETE;
      if (jwtS) {
      const verify = jwt.verify(authorization.split(" ")[1], jwtS);
      if (!verify) {
        return apiResponse(res, "Invalid Token", 401);
      }
      return next();
    }
  } catch (error) {
    return apiResponse(res, "something went wrong in verify token", 500);
  }
}
