import { Response, Request } from "express";

interface ApiResponseData {
  token?: string;
  auth?: boolean;
  message?: string;
}

export function apiResponse(
  res: Response,
  data: ApiResponseData | string | [] | null | undefined,
  statusCode: number,
) {
 

  return res.status(statusCode).json({data});
}

