import { Request, Response } from "express";
import { unsolved_question, unsolved_quiz } from "../../models";

import { ApiResponse, betterZodError } from "../../utils/helper";
import Admin from "../../models/admin";
import { CreateQuestionSchema, CreateQuizSchema } from "../../types";

/**
 *
 * -------------------------------Quiz Controllers-----------------------------------
 *
 */

/**
 *The createQuiz function creates a new quiz with the given admin ID, subject, quiz title, and quiz total marks. It also updates the admin's list of quizzes with the new quiz ID.
 * @param req
 * @param res
 * @argument adminId | subject | quizTitle | quizTotalMarks | subject
 * @returns
 */
export const createQuiz = async (req: Request, res: Response) => {
  try {
    const outPut = CreateQuizSchema.safeParse(req.body);
    if (!outPut.success) {
      const error = betterZodError(outPut.error);
      return ApiResponse({
        res,
        data: error,
        msg: "unable to pars inputs",
        code: 400,
      });
    }
    const { adminId, quizTitle, quizTotalMarks, subject } = outPut.data;
    const newQuiz = await unsolved_quiz.create({
      adminId,
      quizTotalMarks,
      quizTitle,
      subject,
    });
    if (!newQuiz._id) {
      return ApiResponse({
        res,
        data: null,
        msg: "unable to create quiz",
        code: 400,
      });
    }
    const updatedAAdmin = await Admin.findOneAndUpdate(
      { _id: adminId },
      { $push: { quiz: newQuiz._id } }
    );
    if (!updatedAAdmin?._id) {
      return ApiResponse({
        res,
        msg: "quiz Created But Unable to Update Admin",
        code: 402,
      });
    }
    return ApiResponse({
      res,
      data: newQuiz,
      msg: "quiz created successfully",
      code: 201,
    });
  } catch (error) {
    console.log(
      "Error In src/controllers/unsolved_quiz/index.ts:createQuiz:08:01 \n",
      error
    );
    return ApiResponse({
      res,
      data: null,
      msg: "Internal Server Error Pleas Check The Server Logs",
      code: 400,
    });
  }
};
/**
 *The getAllQuizByAdminId function retrieves all quizzes associated with the given admin ID.
 * @param req
 * @param res
 * @argument adminId
 * @returns
 */
export const getAllQuizByAdminId = async (req: Request, res: Response) => {
  try {
    const { adminId } = req.params;
    const quizzes = await unsolved_quiz.find({ adminId }).populate("questions");
    if (quizzes.length < 0) {
      return ApiResponse({
        res,
        data: null,
        msg: "No Quiz Found",
        code: 400,
      });
    }
    return ApiResponse({
      res,
      data: quizzes,
      msg: "Quiz Found",
      code: 200,
    });
  } catch (error) {
    console.log(
      "Error In src/controllers/unsolved_quiz/index.ts:getAllQuizByAdminId:55:01 \n",
      error
    );
    return ApiResponse({
      res,
      data: null,
      msg: "Internal Server Error Pleas Check The Server Logs",
      code: 400,
    });
  }
};
/**
 *The getOneQuizById function retrieves a single quiz with the given ID.
 * @param req
 * @param res
 * @argument quizId
 * @returns
 */
export const getOneQuizById = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;
    const quiz = await unsolved_quiz
      .findOne({ _id: quizId })
      .populate("questions");
    if (!quiz) {
      return ApiResponse({
        res,
        data: null,
        msg: "No Quiz Found",
        code: 400,
      });
    }
    return ApiResponse({
      res,
      data: quiz,
      msg: "Quiz Found",
      code: 200,
    });
  } catch (error) {
    console.log(
      "Error In src/controllers/unsolved_quiz/index.ts:getOneQuizById:87:01 \n",
      error
    );
    return ApiResponse({
      res,
      data: null,
      msg: "Internal Server Error Pleas Check The Server Logs",
      code: 400,
    });
  }
};
/**
 *The updateQuizById function updates the quiz with the given ID with new values for the quiz title, quiz total marks, and subject.
 * @param req
 * @param res
 * @argument quizId
 * @returns
 */
export const updateQuizById = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;
    const outPut = CreateQuizSchema.safeParse(req.body);
    if (!outPut.success) {
      const error = betterZodError(outPut.error);
      return ApiResponse({
        res,
        data: error,
        msg: "unable to pars inputs",
        code: 400,
      });
    }
    const { quizTitle, quizTotalMarks, subject } = outPut.data;
    const quiz = await unsolved_quiz.findOneAndUpdate(
      { _id: quizId },
      {
        quizTitle,
        quizTotalMarks,
        subject,
      },
      {
        new: true,
      }
    );
    if (!quiz) {
      return ApiResponse({
        res,
        data: null,
        msg: "No Quiz Found",
        code: 400,
      });
    }
    return ApiResponse({
      res,
      data: quiz,
      msg: "Quiz Found",
      code: 200,
    });
  } catch (error) {
    console.log(
      "Error In src/controllers/unsolved_quiz/index.ts:updateQuizById:119:01 \n",
      error
    );
    return ApiResponse({
      res,
      data: null,
      msg: "Internal Server Error Pleas Check The Server Logs",
      code: 400,
    });
  }
};
/**
 *The deleteQuizById function deletes the quiz with the given I
 * @param req
 * @param res
 * @argument quizId
 * @returns
 */
export const deleteQuizById = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;
    const deletedQuiz = await unsolved_quiz.findByIdAndDelete({ _id: quizId });
    if (!deletedQuiz?._id) {
      return ApiResponse({
        res,
        data: null,
        msg: "unable to delete quiz",
        code: 400,
      });
    }
    return ApiResponse({
      res,
      data: deletedQuiz,
      msg: "Quiz Deleted",
      code: 200,
    });
  } catch (error) {
    console.log(
      "Error In src/controllers/unsolved_quiz/index.ts:deleteQuizById:184:01 \n",
      error
    );
    return ApiResponse({
      res,
      data: null,
      msg: "Internal Server Error Pleas Check The Server Logs",
      code: 400,
    });
  }
};

/**
 *
 * -------------------------------Question Controllers-----------------------------------
 *
 */

/**
 * The createQuestion function creates a new question with the given quiz ID, question text, options, and answer index. It also updates the quiz's list of questions with the new question ID
 * @param req
 * @param res
 * @argument quizId | question | options[] | answerIndex
 * @returns
 */
export const createQuestion = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;
    const outPut = CreateQuestionSchema.safeParse(req.body);
    if (!outPut.success) {
      const error = betterZodError(outPut.error);
      return ApiResponse({
        res,
        data: error,
        msg: "unable to pars inputs",
        code: 400,
      });
    }
    const { question, options, answerIndex } = outPut.data;
    const newQuestion = await unsolved_question.create({
      question,
      options,
      answerIndex,
      quizId,
    });
    if (!newQuestion?._id) {
      return ApiResponse({
        res,
        data: null,
        msg: "unable to create Question",
        code: 401,
      });
    }
    const updateQuiz = await unsolved_quiz.findByIdAndUpdate(
      { _id: quizId },
      { $push: { questions: newQuestion._id } }
    );
    if (!updateQuiz?._id) {
      return ApiResponse({
        res,
        data: null,
        msg: "unable to update quiz but Question created",
        code: 401,
      });
    }
    return ApiResponse({
      res,
      data: newQuestion,
      msg: "Question created",
      code: 201,
    });
  } catch (error) {
    console.log(
      "Error In src/controllers/unsolved_quiz/index.ts:createQuestion:259:01 \n",
      error
    );
    return ApiResponse({
      res,
      data: null,
      msg: "Internal Server Error Pleas Check The Server Logs",
      code: 400,
    });
  }
};

/**
 *The getOneQuestionsById function retrieves a single question with the given ID.
 * @param req
 * @param res
 * @argument questionId
 * @returns
 */
export const getOneQuestionsById = async (req: Request, res: Response) => {
  try {
    const { questionId } = req.params;
    const question = await unsolved_question.findOne({ _id: questionId });
    if (!question?._id) {
      return ApiResponse({
        res,
        data: null,
        msg: "Unable to find Question",
        code: 404,
      });
    }
    return ApiResponse({
      res,
      data: question,
      msg: "Question Found",
    });
  } catch (error) {
    console.log(
      "Error In src/controllers/unsolved_quiz/index.ts:getOneQuestionsById:319:01 \n",
      error
    );
    return ApiResponse({
      res,
      data: null,
      msg: "Internal Server Error Pleas Check The Server Logs",
      code: 400,
    });
  }
};
/**
 *The updateQuestionById function updates the question with the given ID with new values for the answer index, options, and question text.
 * @param req
 * @param res
 * @argument questionId
 * @returns
 */
export const updateQuestionById = async (req: Request, res: Response) => {
  try {
    const { questionId } = req.params;
    const outPut = CreateQuestionSchema.safeParse(req.body);
    if (!outPut.success) {
      const error = betterZodError(outPut.error);
      return ApiResponse({
        res,
        data: error,
        msg: "unable to pars inputs",
        code: 400,
      });
    }
    const { answerIndex, options, question } = outPut.data;

    const updatedQuestion = await unsolved_question.findOneAndUpdate(
      { _id: questionId },
      {
        answerIndex,
        options,
        question,
      },
      { new: true }
    );
    if (!updatedQuestion?._id) {
      return ApiResponse({
        res,
        data: null,
        msg: "Question Not Found",
        code: 400,
      });
    }

    return ApiResponse({
      res,
      data: updatedQuestion,
      msg: "Question Updated Successfully",
      code: 200,
    });
  } catch (error) {
    console.log(
      "Error In src/controllers/unsolved_quiz/index.ts:UpdateQuestionsById:349:01 \n",
      error
    );
    return ApiResponse({
      res,
      data: null,
      msg: "Internal Server Error Pleas Check The Server Logs",
      code: 400,
    });
  }
};
/**
 *The deleteQuestionById function deletes the question with the given ID.
 * @param req
 * @param res
 * @argument questionId
 * @returns
 */
export const deleteQuestionById = async (req: Request, res: Response) => {
  try {
    const { questionId } = req.params;
    const deleteQuestion = await unsolved_question.findOneAndDelete({
      _id: questionId,
    });
    if (!deleteQuestion?._id) {
      return ApiResponse({
        res,
        data: null,
        msg: "Question Not Found",
        code: 400,
      });
    }
    return ApiResponse({
      res,
      data: deleteQuestion,
      msg: "Question Deleted Successfully",
    });
  } catch (error) {
    console.log(
      "Error In src/controllers/unsolved_quiz/index.ts:deleteQuestionById:402:01 \n",
      error
    );
    return ApiResponse({
      res,
      data: null,
      msg: "Internal Server Error Pleas Check The Server Logs",
      code: 400,
    });
  }
};
