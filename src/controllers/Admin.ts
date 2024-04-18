import { Request, Response } from "express";
import { AdminSchemaZod } from "../types";
import { apiResponse } from "../utils/apiResponse";
import Admin from "../models/Admin";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";
import { betterZodError } from "../utils/betterError";

//?=============================================== Admin SignUp ===========================================

export async function SignUp(req: Request, res: Response) {
  const out = AdminSchemaZod.safeParse(req.body);
  if (!out.success) {
    const error = betterZodError(out.error);
    return apiResponse(res, { message: "unable to pars Inputs", error }, 405);
  }
  const { email, password } = out.data;
  try {
    const hashPassword = bcrypt.hashSync(password, 10);
    const newAdmin = await Admin.create({
      email,
      password: hashPassword,
    });

    if (!newAdmin) {
      return apiResponse(res, "Unable to create Admin", 400);
    }
    const token = generateToken(
      newAdmin.email,
      newAdmin.password,
      newAdmin?._id.toString()
    );
    if (!token) {
      return apiResponse(res, "Unable to create token", 400);
    }
    return apiResponse(res, { token: "bearer " + token, auth: true }, 200);
  } catch (error: any) {
    console.log(error);
    return apiResponse(res, error, 400);
  }
}

//?=============================================== Admin SignIn ===========================================

export async function SignIn(req: Request, res: Response) {
  const out = AdminSchemaZod.safeParse(req.body);
  if (!out.success) {
    const error = betterZodError(out.error);
    return apiResponse(res, { message: "unable to pars Inputs", error }, 405);
  }
  const { email, password } = out.data;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return apiResponse(res, "Admin not found", 404);
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return apiResponse(res, "Invalid password", 400);
    }

    const token = generateToken(
      admin.email,
      admin.password,
      admin._id.toString()
    );
    if (!token) {
      return apiResponse(res, { auth: false }, 400);
    }
    return apiResponse(res, { token: "bearer " + token, auth: true }, 200);
  } catch (error) {
    console.log(error);
    return apiResponse(res, { auth: false }, 500);
  }
}
