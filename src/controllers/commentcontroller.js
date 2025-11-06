import { createCommentService } from "../services/commentService.js";

export const createCommentController = async (req, res) => {
    try {
        const { content, userId, model, CommentableId } = req.body;
        const newComment = await createCommentService(content, userId, model, CommentableId);
        res.status(201).json({
            message: "Comment created successfully",
            status: true,
            data: newComment
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
         message: "Error in creating comment",
         status: false,
         data: null
         });
    }
}

export const findCommentByIdController = async (req, res) => {
    try {
        const { CommentableId } = req.params;
        const comment = await findCommentByIdService(CommentableId);
        res.status(200).json({
            message: "Comment found successfully",
            status: true,
            data: comment
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
         message: "Error in finding the comment",
         status: false,
         data: null
         });
    }
}