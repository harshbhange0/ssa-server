import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    image: { type: String, require: true },
    signInToken: { type: String, require: true },
    solvedTest: [{ type: mongoose.Schema.Types.ObjectId, ref: "solved-quiz" }],
  },
  { timestamps: true }
);

export const User = mongoose.model("user", UserSchema);
