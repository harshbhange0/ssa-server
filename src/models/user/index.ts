import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: { type: String, required: true },
  solvedTest: [{ type: mongoose.Schema.Types.ObjectId, ref: "solved-quiz" }],
});
