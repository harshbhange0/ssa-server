import { Response, Request } from "express";
import { ZodError } from "zod";

interface ApiResponseData {
  token?: string;
  auth?: boolean;
  message?: string;
  error?: string | ZodError | [] | {};
  data?: string | [] | {};
}

export function apiResponse(
  res: Response,
  data: ApiResponseData | string | [] | null | undefined,
  statusCode: number
) {
  return res.status(statusCode).json({ data });
}
