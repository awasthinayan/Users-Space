import express from "express";

const router = express.Router();

import  { signinUserController } from '../controllers/usercontroller.js';

router.post('/',signinUserController );

export default router;