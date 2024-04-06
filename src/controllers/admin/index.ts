import express, { Request, Response } from "express";
import admin from "../../models/admin";
import { AdminSignInSchema } from "../../types";
import { generateSignInToken, validateToken } from "../../utils/JwtToken";

export const SignIn = async (req: Request, res: Response) => {
  try {
    const outPut = AdminSignInSchema.safeParse(req.body);
    if (!outPut.success) {
      return res.json({ error: outPut.error });
    }
    const ExAdmin = await admin.create({
      email: outPut.data.email,
      name: outPut.data.name,
    });
    if (!ExAdmin) {
      const NewAdmin = await admin.create({});
      if (NewAdmin) {
        const token = await generateSignInToken(NewAdmin);
        return res.json({ SignInToken: token }).status(201);
      }
      return res.json({ error: "unable to generate" }).status(401);
    }
    const token = await generateSignInToken(ExAdmin);
    return res.json({ SignInToken: token }).status(201);
  } catch (error) {
    console.log(error);
    return res.json({ error: "Internal Server Error" }).status(500);
  }
};

export const generateAdminToken = async (req: Request, res: Response) => {
  try {
    const token = req.header("signInToken");
    if (token) {
      const verify = await validateToken(token);
      if (verify) {
        return res.json({ auth: true, admin: verify }).status(200);
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .json({ auth: false, error: "Internal Server Error" })
      .status(500);
  }
};
