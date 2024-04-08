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

export const QuestionInputSchema = z.object({
  question: z.string(),
  options: z.array(z.string()) || z.array(z.number()),
  answerIndex: z.number().min(0).max(3),
  quizId: z.string(),
});
export const QuizInputSchema = z.object({
  userId: z.string().optional(),
  adminId: z.string().optional(),
  quizTitle: z.string(),
  quizTime: z.string(),
  subject: z.string(),
  quizTotalMarks: z.number(),
  marksScored: z.number().optional(),
  questions: z.array(QuestionInputSchema).optional(),
});
export type QuestionInputTypes = z.infer<typeof QuestionInputSchema>;
export type QuizInputTypes = z.infer<typeof QuizInputSchema>;
