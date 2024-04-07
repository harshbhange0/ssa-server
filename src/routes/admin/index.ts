import { Router } from "express";
import { SignIn, SignUp,checkSignInToken } from "../../controllers";
import { validateAdmin } from "../../middleware";

export const routerA = Router();

routerA.post("/sign-up", SignUp);
routerA.post("/sign-in", SignIn);
routerA.get("/verify/:id", checkSignInToken);
// protectedRouts
