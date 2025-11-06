import express from 'express'
import connectDB from './config/dbConfig.js';
import { upload } from './middlewares/multer.js';
import { createPost, updatePost } from './controllers/postcontroller.js';
import { deletePost } from './controllers/postcontroller.js';
import apiRoute from './Routers/apiRoute.js';
import { Vailidation } from './Validators/ZodVaildation.js';
import ZodPostSchema from './Validators/ZodPostSchema.js';
import authMiddleware, { isAdmin } from './middlewares/authMiddleware.js';
// import swaggerUi from 'swagger-ui-express';
// import swaggerJSDoc from 'swagger-jsdoc';
// import { options } from './utils/swaggerOptions.js';
import {rateLimit} from 'express-rate-limit';

const PORT = 3000;

// const swaggerDocs = swaggerJSDoc(options)

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const server = express();

server.use(express.json());
server.use(express.urlencoded({extended:true}));

const limiter = (rateLimit({
    windowMs: .3 * 60 * 100, // 5 requests in 30 seconds
    max: 5, // limit each IP to 100 requests per windowMs
    message: "Too many requests from your IP, please try again after an hour",
}));

server.use(limiter)

server.get('/', (req,res) => {
    res.send("hello world Home")
})

server.get('/about', (req,res) => {
    res.json({message:"about page hai"})
})

server.get('/contact',authMiddleware, (req,res) => {
    console.log(req.query)
    console.log(req.body)
    // console.log(req.headers)
    console.log(req.user)
    res.json({message:"contact page hai ",user:req.user})
})

server.use('/user',apiRoute)

server.post('/post',authMiddleware,upload.single('image'),Vailidation(ZodPostSchema), createPost); 

server.delete('/post/:id',authMiddleware, deletePost);

server.put('/post/:id',authMiddleware,isAdmin,upload.single('image'), updatePost);

server.listen(PORT,() =>{
    console.log(`server is running on the port ${PORT}`)
    connectDB();
})

