import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },

    model:{
        type:String,
        required:true,
        enum:["post","comment"]
    },

    CommentableId:{
        type:String,
        required:true,
        refPath:"model"
    },

    replies:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"comment"
        }
    ],
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"like"
        }
    ]
});

const comment = mongoose.model("comment", commentSchema);

export default comment;