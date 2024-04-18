import { Request, Response, Router } from "express";
import { SignIn, SignUp } from "../controllers/Admin";
import { authCheck } from "../middleware";
import { apiResponse } from "../utils/apiResponse";

const AdminRouter = Router();

AdminRouter.post("/sign-in", SignIn);
AdminRouter.post("/sign-up", SignUp);
AdminRouter.get("/verify", authCheck, (req: Request, res: Response) => {
  return apiResponse(res, { auth: true }, 200);
});

export default AdminRouter;
