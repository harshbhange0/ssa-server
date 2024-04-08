import express, { NextFunction, Request, Response } from "express";
import { validateToken } from "../utils/JwtToken";

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
