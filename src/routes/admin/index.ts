import { Router } from "express";
import { SignIn, SignUp } from "../../controllers/admin";
import { validateAdmin } from "../../middleware";

export const routerA = Router();

routerA.post("/sign-up", SignUp);
routerA.post("/sign-in", SignIn);
// protectedRouts
