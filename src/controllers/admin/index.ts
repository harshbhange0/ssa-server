import express, { Request, Response } from "express";
import admin from "../../models/admin";
import { AdminSignInSchema } from "../../types";
import { generateSignInToken, validateToken } from "../../utils/JwtToken";
import { ApiResponse } from "../../utils/helper";

export const SignUp = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const outPut = AdminSignInSchema.safeParse(req.body);
  if (!outPut.success) {
    return ApiResponse({
      res,
      data: outPut.error,
      msg: "Invalid Inputs",
      code: 400,
    });
  }
  try {
    const exUser = await admin.findOne({ email: outPut.data.email });
    if (!exUser) {
      const newUser = await admin.create(outPut.data);
      if (!newUser) {
        return ApiResponse({
          res,
          data: null,
          msg: "unable to sign up user",
          code: 404,
        });
      }
      const token = await generateSignInToken({
        email: newUser.email,
        _id: newUser._id.toString(),
        name: newUser.name,
      });
      if (token) {
        return ApiResponse({
          res,
          data: newUser._id,
          msg: "sign up successful",
          token,
          code: 200,
        });
      }
    }
    return ApiResponse({
      res,
      data: null,
      msg: "User Already Exist Pleas Sign In",
      code: 201,
    });
  } catch (error) {
    console.log("Error in signup controller/admin/index.ts:06:1", error);
    return ApiResponse({
      res,
      data: error,
      msg: "Internal Server Error",
      code: 401,
    });
  }
};
export const SignIn = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const outPut = AdminSignInSchema.safeParse(req.body);
  if (!outPut.success) {
    return ApiResponse({
      res,
      data: outPut.error,
      msg: "Invalid Inputs",
      code: 400,
    });
  }
  try {
    const exUser = await admin.findOne({ email: outPut.data.email });
    if (!exUser) {
      return ApiResponse({
        res,
        data: null,
        msg: "Unable to find user",
        code: 404,
      });
    }
    const token = await generateSignInToken({
      email: exUser.email,
      _id: exUser._id.toString(),
      name: exUser.name,
    });
    if (!token) {
      return ApiResponse({
        res,
        data: null,
        msg: "Un able to Create Token",
        code: 401,
      });
    }
    return ApiResponse({
      res,
      data: exUser._id,
      msg: "sign up successful",
      token,
      code: 200,
    });
  } catch (error) {
    console.log("Error in signup controller/admin/index.ts:63:1", error);
    return ApiResponse({
      res,
      data: error,
      msg: "Internal Server Error",
      code: 401,
    });
  }
};
