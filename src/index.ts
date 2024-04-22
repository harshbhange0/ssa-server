import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./database";

import cors from "cors";
import GlobalRouter from "./routes";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  return res
    .status(200)
});
app.use("/api/v1", GlobalRouter);
ConnectDB();
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
