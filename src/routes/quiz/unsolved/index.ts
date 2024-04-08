import { Router } from "express";
import {
  createQuiz,
  createQuestion,
  getQuiz,
  getQuizByAdmin,
  updateQuiz,
  updateQuestion,
} from "../../../controllers/unsolved_quiz";
import { validateAdmin } from "../../../middleware";

export const unsolvedQuizRouter = Router();

unsolvedQuizRouter.post("/create/quiz", validateAdmin, createQuiz);
unsolvedQuizRouter.post("/create/question", validateAdmin, createQuestion);
unsolvedQuizRouter.get("/all/quiz", validateAdmin, getQuiz);
unsolvedQuizRouter.get(
  "/all/admin/quiz/:adminId",
  validateAdmin,
  getQuizByAdmin
);
unsolvedQuizRouter.put("/update/quiz/:quizId", validateAdmin, updateQuiz);
unsolvedQuizRouter.put(
  "/update/question/:questionId",
  validateAdmin,
  updateQuestion
);
