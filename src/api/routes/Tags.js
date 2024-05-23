import { Router } from "express";
import tag from "../controllers/tags.controller.js";
import Auth from "../middlewares/auth.js";

const router = Router();

router.get('/', tag.getTags);

router.post('/', Auth, tag.postTags);

export default router;