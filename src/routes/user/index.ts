import { Request, Response, Router } from "express";
import { SignInUser, Me } from "../../controllers/user";
import { validateUser } from "../../middleware";
import { ApiResponse } from "../../utils/helper";

export const routerU = Router();

routerU.post("/sign-in", SignInUser);
routerU.get("/user/:id",Me)
routerU.get("/verify", validateUser, (req: Request, res: Response) => {
  return ApiResponse({
    res,
    data: { auth: true },
    code: 200,
    msg: "user authenticated",
  });
});
