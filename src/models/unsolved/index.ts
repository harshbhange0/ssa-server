import mongoose from "mongoose";

export const QuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, unique: true },
    options: [],
    answerIndex: Number,
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "quiz" },
  },
  { timestamps: true }
);

export const QuizSchema = new mongoose.Schema(
  {
    quizTitle: { type: String, required: true, unique: true },
    adminId: { type: mongoose.Schema.ObjectId, ref: "admin" },
    subject: { type: String, required: true },
    quizTotalMarks: { type: Number, required: true },
    questions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "unsolved-question" },
    ],
  },
  { timestamps: true, strict: false }
);

export const unsolved_question = mongoose.model(
  "unsolved-question",
  QuestionSchema
);
export const unsolved_quiz = mongoose.model("unsolved-quiz", QuizSchema);
