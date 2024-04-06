import { z } from "zod";

export const AdminSignInSchema = z.object({
  name: z.string(),
  email: z.string().email("Please enter a valid Email"),
  _id: z.string().optional(),
});

export type AdminType = z.infer<typeof AdminSignInSchema>;
