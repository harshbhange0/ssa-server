import { Router } from "express";
import { Me, SignIn, SignUp } from "../../controllers";
import { validateAdmin, validateApiKey } from "../../middleware";
import express, { Request, Response } from "express";
import { ApiResponse } from "../../utils/helper";

export const routerA = Router();

routerA.post("/sign-up",validateApiKey, SignUp);
routerA.post("/sign-in",validateApiKey, SignIn);
routerA.get("/user/:id", Me);
routerA.get("/verify", validateAdmin, (req: Request, res: Response) => {
  return ApiResponse({
    res,
    data: { auth: true },
    code: 200,
    msg: "user authenticated",
  });
});
