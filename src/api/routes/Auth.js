import { Router } from "express";
import { body } from "express-validator";
import ErrorMiddleware from "../middlewares/ErrorMiddleware.js";
import user from "../controllers/auth.controller.js";
import auth from "../middlewares/auth.js";
// import auth from "../middlewares/auth.js";

const router = Router();
// const user = require('../controllers/auth.controller.js');
// const auth = require('../middlewares/auth');

router.post('/register', user.register);
router.post('/login', user.login);
router.get('/', auth, user.all);

// module.exports = router;

export default router;