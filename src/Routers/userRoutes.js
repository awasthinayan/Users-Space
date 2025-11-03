import express from "express";
const router = express.Router();
import userDetails from './userDetails.js';


router.use('/profile', userDetails);


export default router;