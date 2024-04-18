import mongoose, { Schema, Document } from "mongoose";

const QuizSchema = new Schema({
  Admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", require: false },
  Title: { type: String, require: true, unique: true },
  Subject: { type: String, require: true },
  questions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Question", require: false },
  ],
});
const Quiz = mongoose.model("Quiz", QuizSchema);
export default Quiz;
