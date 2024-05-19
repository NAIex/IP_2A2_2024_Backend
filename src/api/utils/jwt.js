import jwt from "jsonwebtoken";
import createError from "http-errors";

const secretKey = process.env.JWT_SECRET;

export async function signAccessToken(userId, email, isAdmin) {
  try {
    const payload = { userId, email, isAdmin };
    const token = jwt.sign(payload, secretKey, { expiresIn: "1m" });
    return token;
  } catch (error) {
    throw createError.InternalServerError("Unable to sign token");
  }
}

export async function verifyAccessToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      throw createError.Unauthorized(error.message);
    } else {
      throw createError.InternalServerError("Token verification failed");
    }
  }
}
