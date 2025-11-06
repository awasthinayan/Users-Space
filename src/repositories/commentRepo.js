
import comment from "../schema/comments.js";


export const createComment = async (content, userId, model, CommentableId,likes, replies) => {
  try {
    const newComment = new comment.create({
        content,
        userId,
        model, 
        CommentableId,
        likes:[],
        replies:[]
    })
    
    await newComment.save();
    return newComment;

    } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating comment" });
  }
};

export const findCommentById = async (CommentableId) => {
  try {
    const comment = await comment.findById(CommentableId);
    return comment;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in finding the comment" });
  }
};