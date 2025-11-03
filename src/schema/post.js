import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
    },

    content: {
      type: String,
      required: [true, "Post content is required"],
      minlength: [10, "Content should be at least 10 characters long"],
    },
    
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user",
      required:true
    },

    image:{
      type:String,
      require:true
    }
}, { timestamps:true} )

const Post = mongoose.model("post", postSchema)

export default Post;