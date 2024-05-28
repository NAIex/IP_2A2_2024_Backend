import { Router } from "express";
import wbl from "../controllers/WordBlacklist.controller.js";

const router = Router();

router.get('/blacklist', wbl.viewWordBlacklist);
router.put('/blacklist', wbl.addWordToWordBlacklist);
router.delete('/blacklist', wbl.deleteWordFromWordBlacklist);

export default router;