import { Router } from "express";
import { SignIn, generateAdminToken } from "../../controllers/admin";
import { validateAdmin } from "../../middleware";

export const routerA = Router();

routerA.post("/create", SignIn);
// protectedRouts
routerA.post("/verify", validateAdmin, generateAdminToken);

