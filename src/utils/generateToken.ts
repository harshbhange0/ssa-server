import jwt from "jsonwebtoken";
export default function generateToken(
  email: string,
  password: string,
  _id: string
) {
  const jwtS = process.env.JWT_SECRETE;
  if (!jwtS) {
    throw new Error("JWT_SECRETE not found");
  }
  const token = jwt.sign(
    { email: email, password: password, _id: _id },
    jwtS!,
    {
      expiresIn: "12h",
    }
  );

  return token;
}
