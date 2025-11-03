import express from "express";
const router = express.Router();

import allposts from './allposts.js';

router.use('/details',allposts)

export default router;