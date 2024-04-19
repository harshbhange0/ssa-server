import { Router } from "express";
import {
  cerateQue,
  getQueOneById,
  DeleteQueById,
  updateQueById,
} from "../controllers/Question";

const QueRouter = Router();

QueRouter.post("/create", cerateQue);
QueRouter.get("/get/one/by/:id", getQueOneById);
QueRouter.delete("/delete/:id", DeleteQueById);
QueRouter.put("/update/:id", updateQueById);

export default QueRouter;
