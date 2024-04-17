import  { Request, Response } from "express";
import admin from "../../models/admin";
import { AdminSignInSchema } from "../../types";
import {
  generateAuthToken,
  validateToken,
} from "../../utils/JwtToken";
import { ApiResponse, updateSignInToken } from "../../utils/helper";

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
      const token = await generateAuthToken({
        email: newUser.email,
        _id: newUser._id.toString(),
        name: newUser.name,
      });
      if (token) {
        const signInToken = await updateSignInToken({
          _id: newUser._id.toString(),
          email: newUser.email,
          name: newUser.name,
        });
        return ApiResponse({
          res,
          data: newUser._id,
          msg: "sign up successful",
          token,
          signInToken,
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
    const token = await generateAuthToken({
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
    const signInToken = await updateSignInToken({
      _id: exUser._id.toString(),
      email: exUser.email,
      name: exUser.name,
    });
    return ApiResponse({
      res,
      data: exUser._id,
      msg: "sign up successful",
      token,
      signInToken,
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

export const checkSignInToken = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const id = req.params.id;
  if (!id) {
    return ApiResponse({
      res,
      data: { auth: false },
      msg: "id required",
      code: 404,
    });
  }
  try {
    const signInUser = await admin.findById({ _id: id });
    if (!signInUser?.signInToken) {
      return ApiResponse({
        res,
        data: { auth: false },
        msg: "Pleas Sing in first.",
        code: 405,
      });
    }
    const verifiedToken = await validateToken(signInUser?.signInToken);

    //@ts-ignore
    if (verifiedToken.email !== signInUser?.email) {
      return ApiResponse({
        res,
        data: { auth: false },
        msg: "Invalid token or user is not the same person who signed in.",
        code: 402,
      });
    }
    return ApiResponse({
      res,
      data: { auth: true, user: signInUser },
      msg: "Successfully checked Sign In Token.",
      code: 200,
    });
  } catch (error) {
    console.log(error);
    return ApiResponse({
      res,
      data: error,
      msg: "Internal Server Error.",
      code: 500,
    });
  }
};

export const Me = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await admin.findOne({ _id: id });
    if (!user) {
      return ApiResponse({
        res,
        data: null,
        msg: "User not found",
        code: 404,
      });
    }
    return ApiResponse({
      res,
      data: user,
      msg: "User found",
      code: 200,
    });
  } catch (error) {
    console.log("Error in signup controller/user/index.ts:87:1", error);
    return ApiResponse({
      res,
      data: error,
      msg: "Internal Server Error",
      code: 401,
    });
  }
};

