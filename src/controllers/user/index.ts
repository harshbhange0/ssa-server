import { Request, Response } from "express";
import { UserSignInSchema } from "../../types";
import {
  ApiResponse,
  betterZodError,
  updateUserSignInToken,
} from "../../utils/helper";
import { User } from "../../models";
import { generateAuthToken } from "../../utils/JwtToken";

export const SignInUser = async (req: Request, res: Response) => {
  const outPut = UserSignInSchema.safeParse(req.body);
  if (!outPut.success) {
    const error = betterZodError(outPut.error);

    return ApiResponse({
      res,
      data: error,
      msg: "Invalid Inputs",
      code: 400,
    });
  }
  try {
    const exUser = await User.findOne({ email: outPut.data.email });
    if (!exUser) {
      const newUser = await User.create(outPut.data);
      if (!newUser) {
        return ApiResponse({
          res,
          data: null,
          msg: "unable to sign up user",
          code: 404,
        });
      }
      const token = await generateAuthToken({
        email: newUser.email!,
        _id: newUser._id.toString(),
        name: newUser.name,
      });
      if (token) {
        const signInToken = await updateUserSignInToken({
          _id: newUser._id.toString(),
          email: newUser.email!,
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
    const token = await generateAuthToken({
      email: exUser?.email!,
      _id: exUser?._id.toString(),
      name: exUser?.name,
    });
    if (token) {
      const signInToken = await updateUserSignInToken({
        _id: exUser?._id.toString(),
        email: exUser?.email!,
        name: exUser?.name,
      });
      return ApiResponse({
        res,
        data: exUser?._id,
        msg: "sign in successful",
        token,
        signInToken,
        code: 200,
      });
    }
  } catch (error) {
    console.log("Error in signup controller/user/index.ts:07:1", error);
    return ApiResponse({
      res,
      data: error,
      msg: "Internal Server Error",
      code: 401,
    });
  }
};

export const Me = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
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
