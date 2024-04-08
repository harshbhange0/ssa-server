import mongoose from "mongoose";

export const SolvedQuizSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  adminId: { type: mongoose.Schema.ObjectId, ref: "admin" },
  quizTitle: { type: String, required: true },
  quizTime: { type: String, required: true },
  quizTotalMarks: { type: Number, required: true },
  marksScored: { type: Number },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "question" }],
});

export const SolveQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  chooseOptions: Number,
  quizId: [{ type: mongoose.Schema.Types.ObjectId, ref: "quiz" }],
});

export const solved_quiz = mongoose.model("solved-quiz", SolvedQuizSchema);
export const solved_question = mongoose.model(
  "solved-question",
  SolveQuestionSchema
);
