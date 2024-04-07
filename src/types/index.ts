import { Response } from "express";
import { z } from "zod";

export const AdminSignInSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Please enter a valid Email"),
  _id: z.string().optional(),
});

export type AdminType = z.infer<typeof AdminSignInSchema>;

export interface ApiResponseProps {
  token? : string
  data?: string| {}| []|null;
  msg: string;
  res: Response;
  code: number
}
