import jwt from "jsonwebtoken";
import { AdminType } from "../types";

export const generateSignInToken = async (data: AdminType) => {
  const secrete = process.env.JWT_SECRETE;
  if (secrete) {
    const token = await jwt.sign(
      { _id: data._id, email: data.email, name: data.name },
      secrete,
      { expiresIn: "12h" }
    );
    console.log(token, "src/utils/JwtToken.ts:9:1");
    return token;
  }
  throw new Error("No Jwt Secrete src/utils/JwtToken.ts:10:1");
};

export const generateAuthToken = async (data: AdminType) => {
  const secrete = process.env.JWT_SECRETE;
  if (secrete) {
    const token = await jwt.sign(
      { _id: data._id, email: data.email, name: data.name },
      secrete,
      { expiresIn: "1d" }
    );
    return token;
  }
  throw new Error("No Jwt Secrete src/utils/JwtToken.ts:18:1");
};

export const validateToken = async (token: string) => {
  const secrete = process.env.JWT_SECRETE;
  if (secrete) {
    const verify = await jwt.verify(token, secrete);
    return verify;
  }
  throw new Error("No Jwt Secrete src/utils/JwtToken.ts:26:1");
};
