import { unsolvedQuizRouter } from "./quiz/unsolved";
import { routerA } from "./admin";
import { routerU } from "./user";
import { Router } from "express";
import { solvedQuizRouter } from "./quiz/solved";
import { attemptedQuizRouter } from "./quiz/attempted";

export const routerG = Router();

routerG.use("/admin", routerA);
routerG.use("/quiz/unsolved", unsolvedQuizRouter);
routerG.use("/quiz/solved", solvedQuizRouter);
routerG.use("/attempted/quiz", attemptedQuizRouter);
routerG.use("/user", routerU);
