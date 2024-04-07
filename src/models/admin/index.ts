import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  signInToken: { type: String, require: true },
  quiz: [{ type: mongoose.Schema.Types.ObjectId, ref: "quiz", require: false }],
},{timestamps:true});

export default mongoose.model("admin", AdminSchema);
