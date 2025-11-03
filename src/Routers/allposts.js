import express from "express";
const router = express.Router();
import {findAllPosts} from '../controllers/postcontroller.js';

router.get('/', findAllPosts);

export default router;  