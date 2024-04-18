import mongoose, { Schema } from "mongoose";

const QuestionSchema = new Schema({
  question: { type: String, require: true, unique: true },
  answer: { type: Number, require: true },
  options: [{ type: String, required: true }],
});
const Question = mongoose.model("Question", QuestionSchema);
export default Question;
