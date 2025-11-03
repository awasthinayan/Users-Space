import express from "express";

const router = express.Router();

import  { createUserController } from '../controllers/usercontroller.js';

router.post('/',createUserController );


export default router;