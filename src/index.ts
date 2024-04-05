import express, { Request, Response } from "express";
const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.json({ health: "running" }).status(200);
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
