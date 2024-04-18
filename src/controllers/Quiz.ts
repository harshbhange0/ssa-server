import { Request, Response } from "express";
import { QuestionSchemaZod, QuizSchemaZod } from "../types";
import { apiResponse } from "../utils/apiResponse";
import { betterZodError } from "../utils/betterError";
import Quiz from "../models/Quiz";

export async function createQuiz(req: Request, res: Response) {
  try {
    const out = QuizSchemaZod.safeParse(req.body);
    if (!out.success) {
      const error = betterZodError(out.error);
      return apiResponse(res, { message: "unable to pars Inputs", error }, 405);
    }
    const newQuiz = await Quiz.create({
      Title: out.data.Title,
      Subject: out.data.Subject,
      Admin: out.data.Admin,
    });
    if (!newQuiz._id) {
      return apiResponse(res, { message: "unable to create quiz" }, 405);
    }
    return apiResponse(res, { message: "quiz created", data: newQuiz }, 200);
  } catch (error) {
    console.log(error);
    return apiResponse(res, { message: "unable to create quiz" }, 405);
  }
}
export async function getOneQuiz(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const quiz = await Quiz.findOne({ _id: id });
    if (!quiz?._id) {
      return apiResponse(res, { message: "quiz not found" }, 404);
    }
    return apiResponse(res, { message: "quiz found", data: quiz }, 200);
  } catch (error) {
    console.log(error);
    return apiResponse(res, { message: "unable to get quiz" }, 405);
  }
}

export async function getQuizByAdminId(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const quizzes = await Quiz.find({ Admin: id });
    if (!quizzes) {
      return apiResponse(
        res,
        { message: "unable to get quiz with id", data: id },
        402
      );
    }
    return apiResponse(res, { message: "quiz found", data: quizzes }, 200);
  } catch (error) {
    console.log(error);
    return apiResponse(res, { message: "unable to get quiz" }, 405);
  }
}
export async function getQuizBySubject(req: Request, res: Response) {
  const { subject } = req.params;
  try {
    const quizzes = await Quiz.find({ Subject: subject });
    if (!quizzes) {
      return apiResponse(
        res,
        { message: "unable to get quiz with subject", data: subject },
        402
      );
    }
    return apiResponse(res, { message: "quiz found", data: quizzes }, 200);
  } catch (error) {
    console.log(error);
    return apiResponse(res, { message: "unable to get quiz" }, 405);
  }
}

export async function deleteQuizById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const deletedQuiz = await Quiz.findOneAndDelete({ _id: id });
    if (!deletedQuiz) {
      return apiResponse(
        res,
        { message: "unable to delete quiz with id", data: id },
        402
      );
    }
    return apiResponse(
      res,
      { message: "quiz deleted", data: deletedQuiz },
      200
    );
  } catch (error) {
    console.log(error);
    return apiResponse(res, { message: "unable to delete quiz" }, 405);
  }
}
export async function updateQuizById(req: Request, res: Response) {
  const { id } = req.params;
  const out = QuizSchemaZod.safeParse(req.body);
  if (!out.success) {
    const error = betterZodError(out.error);
    return apiResponse(res, { message: "unable to pars Inputs", error }, 405);
  }
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      { _id: id },
      {
        Title: out.data.Title,
        Subject: out.data.Subject,
      },
      { new: true }
    );
    if (!updatedQuiz?._id) {
      return apiResponse(
        res,
        { message: "unable to update quiz with id", data: id },
        402
      );
    }
    return apiResponse(res, { message: "quiz updated successful" }, 200);
  } catch (error) {
    console.log(error);
    return apiResponse(res, { message: "unable to update quiz" }, 405);
  }
}
