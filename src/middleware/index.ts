import express, { NextFunction, Request, Response } from "express";
import { validateToken } from "../utils/JwtToken";
import { ApiResponse } from "../utils/helper";

export const validateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("authorization");
    if (!token) {
      return res.status(403).json({ auth: false, error: "No Token Provided." });
    }
    const verify = await validateToken(token);
    if (verify) {
      return next();
    }
  } catch (error) {
    console.log(error);
    return res
      .json({ auth: false, error: "Internal Server Error" })
      .status(500);
  }
};

export const validateApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { api_key } = req.headers;
  const ServerKye = process.env.API_KEY;
  if (!api_key) {
    return ApiResponse({ res, msg: "Api Key Missing In Headers", code: 200 });
  }
  if (!ServerKye) {
    return ApiResponse({ res, msg: "Pleas Provide Api Key As Env", code: 200 });
  }
  if (api_key !== ServerKye) {
    return ApiResponse({ res, msg: "Unauthorized Request", code: 200 });
  }
  return next();
};
