import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./database";
import { routerG } from "./routes";

dotenv.config();
const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.json({ health: "running" }).status(200);
});
app.use("/api/v1", routerG);
ConnectDB();
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
