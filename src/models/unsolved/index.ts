import mongoose from "mongoose";

export const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [],
  answerIndex: Number, 
  quizId: [{ type: mongoose.Schema.Types.ObjectId, ref: "quiz" }],
});

export const QuizSchema = new mongoose.Schema({
  quizTitle: { type: String, required: true },
  adminId: { type: mongoose.Schema.ObjectId, ref: "admin" },
  subject: { type: String, required: true },
  quizTotalMarks: { type: Number, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "question" }],
});

mongoose.model("unsolved-question", QuestionSchema);
mongoose.model("unsolved-quiz", QuizSchema);
