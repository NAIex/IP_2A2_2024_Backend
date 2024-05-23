import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import createError from "http-errors";
import dotenv from "dotenv";

dotenv.config();

function loadKey(filePath) {
  try {
    return fs.readFileSync(path.resolve(filePath), "utf8");
  } catch (error) {
    console.error(`Error loading the key from ${filePath}:`, error);
    throw createError.InternalServerError(
      `Failed to load key from ${filePath}`
    );
  }
}

// Load RSA keys using environment variables
const privateKey = loadKey("./private_key.pem");
const publicKey = loadKey("./public_key.pem");

export async function signAccessToken(userId, email, isAdmin) {
  try {
    const payload = { userId, email, isAdmin };
    const token = jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: '200m',
    });
    return token;
  } catch (error) {
    console.error("Error signing the token:", error);
    throw createError.InternalServerError("Unable to sign token");
  }
}

export async function verifyAccessToken(token) {
  try {
    const decoded = jwt.verify(token, publicKey, { algorithms: ["RS256"] });
    return decoded;
  } catch (error) {
    console.error("Error verifying the token:", error);
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
