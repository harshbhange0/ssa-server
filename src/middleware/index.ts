import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse";
import jwt from "jsonwebtoken";
import { data } from "../routs";

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
  } catch (error:any) {
    return apiResponse(
      res,
      { message: "something went wrong in verify token", data: error.message },
      500
    );
  }
}
