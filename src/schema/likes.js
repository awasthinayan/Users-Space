import mongoose from "mongoose";
import { en } from "zod/locales";

const likeSchema = new mongoose.Schema({
    model:{
        type: String,
        required: true,
        enum: ["comment", "post"]
    },
    likeableId:{
        type: String,
        required: true,
        refPath: "model"
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
},{timestamps:true}); 

const like = mongoose.model("like", likeSchema);

export default like; 