import { z } from "zod";

export const betterZodError = (error: z.ZodError<any>) => {
  let errorMsg: { error: string; path: (string | number)[] }[] = [];
  error.errors.forEach((err: any) => {
    errorMsg.push({ error: err.message, path: err.path });
  });
  console.log(errorMsg);
  return errorMsg;
};
