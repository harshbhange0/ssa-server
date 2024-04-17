import { Router } from "express";
import {
  createQuestion,
  createQuiz,
  deleteQuestionById,
  deleteQuizById,
  getAllQuizByAdminId,
  getOneQuestionsById,
  getOneQuizById,
  updateQuestionById,
  updateQuizById,
} from "../../../controllers/unsolved_quiz";

export const unsolvedQuizRouter = Router();

unsolvedQuizRouter.post("/create/quiz", createQuiz); //
unsolvedQuizRouter.get("/get/all/quiz/by/admin/:adminId", getAllQuizByAdminId); //
unsolvedQuizRouter.get("/get/one/quiz/:quizId", getOneQuizById); //
unsolvedQuizRouter.put("/update/one/quiz/:quizId", updateQuizById); //
unsolvedQuizRouter.delete("/delete/one/quiz/:quizId", deleteQuizById); //

unsolvedQuizRouter.post("/create/question/:quizId", createQuestion); //
// unsolvedQuizRouter.get("/get/all/question/by/quiz/:quizId");
unsolvedQuizRouter.get("/get/one/question/:questionId", getOneQuestionsById); //
unsolvedQuizRouter.put("/update/one/question/:questionId", updateQuestionById);
unsolvedQuizRouter.delete(
  "/delete/one/question/:questionId",
  deleteQuestionById
);
