import { Request, Response } from "express";
import { QuestionSchemaZod, QuestionUpdateSchemaZod } from "../types";
import { betterZodError } from "../utils/betterError";
import { apiResponse } from "../utils/apiResponse";
import Question from "../models/Question";
import Quiz from "../models/Quiz";
export async function cerateQue(req: Request, res: Response) {
  try {
    const out = QuestionSchemaZod.safeParse(req.body);
    if (!out.success) {
      const error = betterZodError(out.error);
      return apiResponse(res, { message: "unable to pars Inputs", error }, 405);
    }
    const exQuiz = await Quiz.findOne({ _id: out.data.quizId });
    if (!exQuiz?._id) {
      return apiResponse(
        res,
        {
          message: "quiz not found unable to create Question",
        },
        404
      );
    }
    const newQue = await Question.create({
      question: out.data.question,
      options: out.data.options,
      answer: out.data.answer,
      quizId: out.data.quizId,
    });
    if (!newQue._id) {
      return apiResponse(res, { message: "unable to create question" }, 405);
    }
    const updateQuiz = await Quiz.updateOne(
      { _id: out.data.quizId },
      { $push: { questions: newQue._id } },
      { new: true }
    );

    if (!updateQuiz) {
      return apiResponse(res, { message: "unable to update quiz" }, 405);
    }
    return apiResponse(res, { message: "question created", data: newQue }, 200);
  } catch (error) {
    console.log(error);
    return apiResponse(res, { message: "unable to create question" }, 405);
  }
}
export async function getQueOneById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const que = await Question.findOne({ _id: id });
    if (!que?._id) {
      return apiResponse(res, { message: "unable to find question" }, 405);
    }
    return apiResponse(res, { message: "question found", data: que }, 200);
  } catch (error) {
    console.log(error);
    return apiResponse(res, { message: "unable to get question" }, 405);
  }
}
export async function updateQueById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const out = QuestionUpdateSchemaZod.safeParse(req.body);
    if (!out.success) {
      const error = betterZodError(out.error);
      return apiResponse(res, { message: "unable to pars Inputs", error }, 405);
    }
    const updatedQue = await Question.findOneAndUpdate({ _id: id }, out.data, {
      new: true,
    });
    if (!updatedQue?._id) {
      return apiResponse(res, { message: "unable to update Question" }, 405);
    }
    return apiResponse(
      res,
      { message: "Question found", data: updatedQue },
      200
    );
  } catch (error) {
    console.log(error);
    return apiResponse(res, { message: "unable to update Question" }, 405);
  }
}
export async function DeleteQueById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const deletedQue = await Question.deleteMany({ _id: id });
    const updateQuiz = await Quiz.updateOne(
      { questions: id },
      { $pull: { questions: id } }
    );

    if (!deletedQue && !updateQuiz) {
      return apiResponse(res, { message: "unable to delete Question" }, 405);
    }
    return apiResponse(
      res,
      { message: "Question found", data: { deletedQue, updateQuiz } },
      200
    );
  } catch (error) {
    console.log(error);
    return apiResponse(res, { message: "unable to delete Question" }, 405);
  }
}
