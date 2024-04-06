import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./database";
import { routerG } from "./routes";
import { data } from "./routs";
const app = express();
const port = 3000;
dotenv.config();
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  user + 1;
  console.log(`User Connected : ${user}`);
  const url = process.env.DATA_BASE_URL;
  res.json({ health: "running", data, user, url }).status(200);
});
let user = 0;
app.use("/api/v1", routerG);
ConnectDB();
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
