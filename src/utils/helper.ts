import { ApiResponseProps } from "../types";

export const ApiResponse = ({
  data,
  code,
  msg,
  res,
  token,
}: ApiResponseProps) => {
  if (token) {
    return res.json({ data: data, msg, token: `bearer ${token}`}).status(code);
  }
  return res.json({ data: data, msg }).status(code);
};
