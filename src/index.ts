import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./database";
import { routerG } from "./routes";
import { data } from "./routs";
import { ApiResponse } from "./utils/helper";
import { validateApiKey } from "./middleware";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
dotenv.config();
const port = process.env.PORT|| 3000;

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  return ApiResponse({ res, data, msg: "server  is running", code: 200 });
});
app.use("/api/v1", routerG);
ConnectDB();
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
