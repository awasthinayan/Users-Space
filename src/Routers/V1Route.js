import express from 'express';
const router = express.Router();
import userRoute from './userRoutes.js';  
import postRoute from './postRoutes.js';
import signin from './signin.js';
import { upload } from '../middlewares/multer.js';

router.use('/V1',upload.none(), userRoute)
router.use('/V1/Post', postRoute)
router.use('/V1/signin', signin)

export default router; 