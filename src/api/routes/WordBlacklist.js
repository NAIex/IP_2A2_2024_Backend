import { Router } from "express";
import wbl from "../controllers/WordBlacklist.controller.js";

const router = Router();

router.post('/viewWordBlacklist', wbl.viewWordBlacklist);
router.post('/addWordToWordBlacklist', wbl.addWordToWordBlacklist);
router.post('/deleteWordFromWordBlacklist', wbl.deleteWordFromWordBlacklist);

export default router;