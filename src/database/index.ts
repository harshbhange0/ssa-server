import mongoose from "mongoose";

export async function ConnectDB() {
  const url = process.env.DATA_BASE_URL;
  if (url) {
    mongoose
      .connect(url)
      .then(() => console.log("MongoDB Connected..."))
      .catch((err) => console.error(err));
  } else {
    console.log("unable to find database url");
  }
}
