import { Request, Response } from "express";
import { unsolved_question, unsolved_quiz } from "../../models";
import { QuestionInputSchema, QuizInputSchema } from "../../types";
import { ApiResponse, findAdmin } from "../../utils/helper";

export const createQuiz = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const output = QuizInputSchema.safeParse(req.body);
  if (!output.success) {
    return ApiResponse({
      res,
      data: output.error,
      msg: "Invalid Input",
      code: 401,
    });
  }
  try {
    const { adminId, quizTime, quizTitle, quizTotalMarks, subject } =
      output.data;
    const NewQuiz = await unsolved_quiz.create({
      quizTitle,
      adminId,
      subject,
      quizTotalMarks,
      quizTime,
    });
    if (!NewQuiz) {
      return ApiResponse({
        res,
        data: null,
        msg: "Error while creating the quiz",
        code: 500,
      });
    }
    return ApiResponse({
      res,
      data: NewQuiz._id,
      code: 200,
      msg: "Quiz created successfully",
    });
  } catch (error) {
    console.log("Error in signup controller/quiz/index.ts:07:1", error);
    return ApiResponse({
      res,
      data: error,
      msg: "Internal Server Error",
      code: 401,
    });
  }
};

export const createQuestion = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const outPut = QuestionInputSchema.safeParse(req.body);
  if (!outPut.success) {
    return ApiResponse({
      res,
      data: outPut.error,
      msg: "Invalid Inputs Question",
      code: 402,
    });
  }
  const { answerIndex, options, question, quizId } = outPut.data;
  try {
    const newQuestion = await unsolved_question.create({
      answerIndex,
      options,
      question,
      quizId,
    });
    if (!newQuestion) {
      return ApiResponse({
        res,
        data: null,
        msg: "unable to create  the question",
        code: 500,
      });
    }
    const updateQuiz = await unsolved_quiz.findByIdAndUpdate(
      {
        _id: quizId,
      },
      { questions: newQuestion._id }
    );
    return ApiResponse({
      res,
      data: {
        quizId: updateQuiz?._id,
        questionId: newQuestion._id,
      },
      msg: "question Created  Successfully!",
      code: 500,
    });
  } catch (error) {
    console.log("Error in signup controller/quiz/index.ts:55:1", error);
    return ApiResponse({
      res,
      data: error,
      msg: "Internal Server Error",
      code: 401,
    });
  }
};

export const getQuizByAdmin = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { adminId } = req.params;
  const exAdmin = await findAdmin(adminId);
  if (!exAdmin) {
    return ApiResponse({
      res,
      data: null,
      msg: "Invalid Admin ID",
      code: 403,
    });
  }
  try {
    const AdminQuiz = await unsolved_quiz
      .find({
        adminId,
      })
      .populate("question");
    if (!AdminQuiz) {
      return ApiResponse({
        res,
        data: null,
        msg: "No Quiz Found For This User",
        code: 404,
      });
    }
    return ApiResponse({
      res,
      data: AdminQuiz,
      msg: "Quiz Found ",
      code: 200,
    });
  } catch (error) {
    console.log("Error in signup controller/quiz/index.ts:110:1", error);
    return ApiResponse({
      res,
      data: error,
      msg: "Internal Server Error",
      code: 401,
    });
  }
};

export const getQuiz = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const quiz = await unsolved_quiz.find().populate("question");
    if (!quiz) {
      return ApiResponse({
        res,
        data: null,
        msg: "No Quiz Available",
        code: 404,
      });
    }
    return ApiResponse({
      res,
      data: quiz,
      msg: "Quiz List",
      code: 200,
    });
  } catch (error) {
    console.log("Error in signup controller/quiz/index.ts:110:1", error);
    return ApiResponse({
      res,
      data: error,
      msg: "Internal Server Error",
      code: 401,
    });
  }
};

export const updateQuiz = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { quizId } = req.params;
  const { data } = req.body;
  try {
    const updatedQuiz = await unsolved_quiz.findByIdAndUpdate(
      { _id: quizId },
      { ...data }
    );
    if (!updatedQuiz) {
      return ApiResponse({
        res,
        data: null,
        msg: "unable to update Quiz",
        code: 404,
      });
    }
    return ApiResponse({
      res,
      data: updatedQuiz._id,
      msg: "Quiz Updated Successfully",
      code: 200,
    });
  } catch (error) {
    console.log("Error in signup controller/quiz/index.ts:183:1", error);
    return ApiResponse({
      res,
      data: error,
      msg: "Internal Server Error",
      code: 401,
    });
  }
};
export const updateQuestion = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { questionId } = req.params;
  const { data } = req.body;
  try {
    const updateQuestion = await unsolved_quiz.findByIdAndUpdate(
      { _id: questionId },
      { ...data }
    );
    if (!updateQuestion) {
      return ApiResponse({
        res,
        data: null,
        msg: "unable to update Quiz",
        code: 404,
      });
    }
    return ApiResponse({
      res,
      data: updateQuestion._id,
      msg: "Quiz Updated Successfully",
      code: 200,
    });
  } catch (error) {
    console.log("Error in signup controller/quiz/index.ts:183:1", error);
    return ApiResponse({
      res,
      data: error,
      msg: "Internal Server Error",
      code: 401,
    });
  }
};
