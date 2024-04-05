import { routerQ } from "./quiz";
import { routerA } from "./admin";
import { routerU } from "./user";
import { Router } from "express";

export const routerG = Router();

routerG.use("/admin", routerA);
routerG.use("/quiz", routerQ);
routerG.use("/user", routerU);
