import { Response } from "express";
import { z } from "zod";

export const AdminSignInSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Please enter a valid Email"),
  _id: z.string().optional(),
});

export type AdminType = z.infer<typeof AdminSignInSchema>;

export interface ApiResponseProps {
  token?: string;
  signInToken?: string;
  data?: string | {} | [] | null;
  msg: string;
  res: Response;
  code: number;
}
export interface QuizInputSchema {
  userId?: string;
  adminId: string;
  quizTitle: string;
  quizTime: string;
  quizTotalMarks: number;
  marksScored?: number;
  questions: QuestionInputSchema[];
}
export interface QuestionInputSchema {
  question: string;
  options: string[] | number[];
  answerIndex: Number;
  quizId: string;
}
