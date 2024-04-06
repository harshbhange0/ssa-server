import jwt from "jsonwebtoken";
const secrete = process.env.JWT_SECRETE;

export const generateSignInToken = async (data: any) => {
  if (secrete) {
    const token = await jwt.sign(data, secrete, { expiresIn: "12h" });
    return token;
  }
  return null;
};

export const generateAuthToken = async (data: any) => {
  if (secrete) {
    const token = await jwt.sign(data, secrete, { expiresIn: "1d" });
    return token;
  }
  return null;
};

export const    validateToken = async (token: string) => {
  if (secrete) {
    const verify = await jwt.verify(token, secrete);
    return verify;
  }
  return null;
};
