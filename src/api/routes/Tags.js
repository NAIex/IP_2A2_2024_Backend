import { Router } from "express";
import tag from "../controllers/tags.controller.js";

const router = Router();

router.get('/', tag.getTags);

router.post('/', tag.postTags);

export default router;