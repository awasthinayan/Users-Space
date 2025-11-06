import { ca } from "zod/locales";
import { createComment, findCommentById } from "../repositories/commentRepo.js";
import { findPostById } from "../repositories/postRepo.js";

export const createCommentService = async (content, userId, model, CommentableId) => {
    try {
        let parent = await fetchParentComment(model, CommentableId);
        if(!parent){
            throw new Error(`${model} not found`);   
        }

        const newComment = await createComment(content, userId, model, CommentableId);
        await fetchchildcommentparent(model, CommentableId,newComment);

        return newComment;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in creating comment" }); 
    }
}

const fetchchildcommentparent = async (model,parent,comment) => {
    try {
        if(model==="post"){
            parent.comment.push(comment._id);
        }
        else if(model==="comment"){
            parent.replies.push(comment._id);
        }
        await parent.save();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in fetching child comment" });
    }
}
const fetchParentComment = async (model, CommentableId) => {
    try {
        let parent;
        if(model==="post"){
            parent = await findPostById(CommentableId);
    }
    else if(model==="comment"){
        parent = await findCommentById(CommentableId);
    }
    return parent;
}
    catch(error){
        console.log(error);
        res.status(500).json({message:"Error in fetching parent comment"});
    }
} 

export const findCommentByIdService = async (CommentableId) => {
    try {
        const comment = await findCommentById(CommentableId);
        return comment;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in finding the comment" });
    }
};