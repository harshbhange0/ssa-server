import { Router } from "express";
import {
  createQuiz,
  deleteQuizById,
  getOneQuiz,
  getQuizByAdminId,
  getQuizBySubject,
  updateQuizById,
} from "../controllers/Quiz";

const QuizRouter = Router();

QuizRouter.post("/create", createQuiz);
QuizRouter.get("/get/one/:id", getOneQuiz);
QuizRouter.get("/get/by/admin/:id", getQuizByAdminId);
QuizRouter.get("/get/by/subject/:subject", getQuizBySubject);
QuizRouter.put("/update/:id", updateQuizById);
QuizRouter.delete("/delete/:id", deleteQuizById);

export default QuizRouter;
