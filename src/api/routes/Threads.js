import { Router } from "express";
import { body } from "express-validator";
import ErrorMiddleware from "../middlewares/ErrorMiddleware.js";
import { addThreadToCommunity } from "../controllers/ThreadsController.js";

const router = Router();

router.post(
    "/",
    body("communityId").notEmpty().withMessage("community id is required"),
    body("name").notEmpty().withMessage("name is required"),
    body("description")
      .notEmpty()
      .withMessage("description is requored"),
    body("type").notEmpty().withMessage("type is required"),
    ErrorMiddleware,
    addThreadToCommunity
  );
  
  export default router;