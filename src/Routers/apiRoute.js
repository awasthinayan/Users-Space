import express from 'express';
const router = express.Router();
import V1Route from './V1Route.js';

router.use('/api',V1Route)

export default router;
