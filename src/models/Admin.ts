import mongoose, { Schema, Document } from "mongoose";

const AdminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  quizzes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", require: false },
  ],
});
const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;
