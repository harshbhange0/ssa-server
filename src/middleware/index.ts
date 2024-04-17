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
    const verify = await validateToken(token.split(" ")[1]);
    if (!verify) {
      return ApiResponse({
        res,
        data: {
          auth: false,
        },
        msg: "Invalid Token",
        code: 200,
      });
    }
    return next();
  } catch (error: any) {
    console.log(error + "\n/middleware/index.ts:05:01");
    return ApiResponse({ res, data: null, msg: error.massage, code: 400 });
  }
};

export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("authorization");
    if (!token) {
      return res.status(403).json({ auth: false, error: "No Token Provided." });
    }
    const verify = await validateToken(token.split(" ")[1]);
    if (verify) {
      return next();
    }
  } catch (error: any) {
    console.log(error.message + "\n middleware/index.ts:33:01");
    return ApiResponse({
      res,
      data: { auth: false },
      msg: error.message,
      code: 400,
    });
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
    return ApiResponse({
      res,
      msg: "Unauthorized Request",
      code: 200,
    });
  }
  return next();
};
