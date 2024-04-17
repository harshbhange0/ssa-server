import { Response } from "express";
import { z } from "zod";

export const AdminSignInSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Please enter a valid Email"),
  _id: z.string().optional(),
});
export const UserSignInSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Please enter a valid Email"),
  _id: z.string().optional(),
  image: z.string().optional(),
});

export type AdminType = z.infer<typeof AdminSignInSchema>;
export type UserType = z.infer<typeof UserSignInSchema>;

export interface ApiResponseProps {
  token?: string;
  signInToken?: string;
  data?: string | {} | [] | null;
  msg: string;
  res: Response;
  code?: number;
}

export const CreateQuizSchema = z.object({
  quizTitle: z.string().min(1, { message: "Quiz Title is required" }),
  adminId: z.string().min(1, { message: "Admins Id is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  quizTotalMarks: z
    .number()
    .min(1, { message: "Quiz Total Marks is required" }),
});
export const CreateQuestionSchema = z.object({
  question: z.string().min(1, { message: "Question is required" }),
  answerIndex: z.number().min(1, { message: "Answer is required" }),
  options: z.array(z.string().min(1, { message: "Options is required" })),
});

export type CreateQuizType = z.infer<typeof CreateQuizSchema>;
export type CreateQuestionType = z.infer<typeof CreateQuestionSchema>;
