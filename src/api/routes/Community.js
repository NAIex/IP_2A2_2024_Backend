import { Router } from "express";
import { body } from "express-validator";
import ErrorMiddleware from "../middlewares/ErrorMiddleware.js";
import {
  getCommunity,
  addCommunity,
  removeCommunity,
} from "../controllers/CommunityController.js";
const router = Router();

// only  for debbuging
router.get("/", getCommunity);

router.post("/", body("name").notEmpty(), ErrorMiddleware, addCommunity);
router.delete("/", body("id").notEmpty(), ErrorMiddleware, removeCommunity);

export default router;
