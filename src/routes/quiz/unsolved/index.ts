import { Router } from "express";
import {
  createQuiz,
  createQuestion,
  getQuiz,
  getQuizByAdmin,
  updateQuestion,
  getQuizBySubject,
  updateQuiz,
} from "../../../controllers/unsolved_quiz";
// import { updateQuiz } from "../../../controllers/unsolved_quiz/updateQuiz";

export const unsolvedQuizRouter = Router();

unsolvedQuizRouter.post("/create/quiz", createQuiz);
unsolvedQuizRouter.post("/create/question", createQuestion);
unsolvedQuizRouter.get("/all/quiz", getQuiz);
unsolvedQuizRouter.get("/all/admin/quiz/:adminId", getQuizByAdmin);
unsolvedQuizRouter.get("/all/quiz/subject/:subject", getQuizBySubject);
unsolvedQuizRouter.put("/update/quiz/:quizId", updateQuiz);
unsolvedQuizRouter.put("/update/question/:questionId", updateQuestion);
