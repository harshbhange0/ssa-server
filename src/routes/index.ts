import { Router } from "express";
import Admin from "./AdminRoutes";
import { authCheck } from "../middleware";
import QuizRouter from "./QuizRoutes";
import QueRouter from "./QueRoutes";

const GlobalRouter = Router();

GlobalRouter.use("/admin", Admin);
GlobalRouter.use("/quiz", authCheck, QuizRouter);
GlobalRouter.use("/question", authCheck, QueRouter);
export default GlobalRouter;
