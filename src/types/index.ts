import { z } from "zod";

export const AdminSchemaZod = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export const QuizSchemaZod = z.object({
  Admin: z.string().min(1),
  Title: z.string().min(5),
  Subject: z.string().min(6),
});

export const QuizUpdateSchemaZod = z.object({
  Title: z.string().min(5),
  Subject: z.string().min(6),
});

export const QuestionSchemaZod = z.object({
  quizId: z.string().min(5),
  question: z.string().min(5),
  options: z.array(z.string()),
  answer: z.number().min(1),
});

export const QuestionUpdateSchemaZod = z.object({
  question: z.string().min(5),
  options: z.array(z.string()),
  answer: z.number().min(1),
});