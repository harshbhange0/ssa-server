import { Router } from "express";
import { SignIn, SignUp } from "../controllers/Admin";

const AdminRouter = Router();

AdminRouter.post("/sign-in",SignIn)
AdminRouter.post("/sign-up",SignUp)

export default AdminRouter 
