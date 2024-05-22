import { Router } from "express";
import tag from "../controllers/tags.controller.js";

const router = Router();

router.get('/', tag.getTags);

export default router;