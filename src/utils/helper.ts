import admin from "../models/admin";
import { AdminType, ApiResponseProps } from "../types";
import { generateSignInToken } from "./JwtToken";

export const ApiResponse = ({
  data,
  code,
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
