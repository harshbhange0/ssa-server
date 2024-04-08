import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./database";
import { routerG } from "./routes";
import { data } from "./routs";
import { ApiResponse } from "./utils/helper";
const app = express();
const port = 3000;
dotenv.config();
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  return ApiResponse({ res, data, msg: "server  is running", code: 200 });
});
let user = 0;
app.use("/api/v1", routerG);
ConnectDB();
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
