import { User } from "../models";
import admin from "../models/admin";
import { AdminType, ApiResponseProps, UserType } from "../types";
import { generateSignInToken } from "./JwtToken";
import { z } from "zod";

export const ApiResponse = ({
  data=null,
  code=200,
  msg,
  res,
  token,
  signInToken,
}: ApiResponseProps) => {
  if (token) {
    return res
      .json({
        data: data,
        msg,
        token: `bearer ${token}`,
        signInToken: `bearer ${signInToken}`,
      })
      .status(code);
  }
  return res.json({ data: data, msg }).status(code);
};

export const updateSignInToken = async ({ email, name, _id }: AdminType) => {
  const signInToken = await generateSignInToken({ email, name, _id });
  if (!signInToken) {
    throw new Error("unable to Generate Token ");
  }
  const updateUser = await admin.updateOne({ _id }, { signInToken });
  if (!updateUser) {
    throw new Error("unable to update User ");
  }
  return signInToken;
};
export const updateUserSignInToken = async ({ email, name, _id }: UserType) => {
  const signInToken = await generateSignInToken({ email, name, _id });
  if (!signInToken) {
    throw new Error("unable to Generate Token ");
  }
  const updateUser = await User.updateOne({ _id }, { signInToken });
  if (!updateUser) {
    throw new Error("unable to update User ");
  }
  return signInToken;
};
export const findAdmin = async (id: string) => {
  const exAdmin = await admin.findById({ _id: id });
  if (!exAdmin) {
    return null;
  }
  return exAdmin;
};
export const betterZodError = (error: z.ZodError<any>) => {
  let errorMsg: { error: string; path: (string | number)[] }[] = [];
  error.errors.forEach((err) => {
    errorMsg.push({ error: err.message, path: err.path });
  });
  console.log(errorMsg);
  return errorMsg;
};
