import { Router } from "express";
import Admin from "./AdminRoutes";

const GlobalRouter = Router();

GlobalRouter.use("/admin", Admin);

export default GlobalRouter