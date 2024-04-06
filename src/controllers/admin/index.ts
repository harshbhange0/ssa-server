import express, { Request, Response } from "express";
import admin from "../../models/admin";
import { AdminSignInSchema } from "../../types";
import { generateSignInToken, validateToken } from "../../utils/JwtToken";

export const SignIn = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const outPut = AdminSignInSchema.safeParse(req.body);

    if (!outPut.success) {
      return res.json({ error: outPut.error });
    }
    const ExAdmin = await admin.findOne({
      email: outPut.data.email,
    });
    if (ExAdmin) {
      const token = await generateSignInToken({
        _id: ExAdmin._id.toString(),
        email: ExAdmin.email,
        name: ExAdmin.name,
      });
      if (!token) {
        return res.json({ error: "unable to generate" }).status(401);
      }
      return res.json({ SignInToken: token, msg: "token created" }).status(201);
    }
    if (!ExAdmin) {
      const NewAdmin = await admin.create({});
      if (NewAdmin) {
        const token = await generateSignInToken({
          _id: NewAdmin._id.toString(),
          email: NewAdmin.email,
          name: NewAdmin.name,
        });
        return res
          .json({ SignInToken: token, msg: "user created " })
          .status(201);
      }
      return res.json({ error: "unable to generate" }).status(401);
    }
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
        const token = await generateSignInToken({
          //@ts-ignore
          _id: verify?._id!, //@ts-ignore
          email: verify?.email!, //@ts-ignore
          name: verify?.name!, //@ts-ignore
        });
        return res.json({ auth: true, SignInToken: token }).status(200);
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .json({ auth: false, error: "Internal Server Error" })
      .status(500);
  }
};
