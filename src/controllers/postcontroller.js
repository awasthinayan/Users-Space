import { createPostService, deletePostService, findAllPostsService, updatePostService} from '../services/postService.js';

export async function createPost(req, res) {
    try {
    console.log(req.user);
    // call the service layer function
    if(!req.file || !req.file.path) {
        return res.status(400).json({
            success: false,
            message: "Image is required"
        });
    }

    const user = req.user.id;

    const { title, content} = req.body;
    const image = req.file.path;

    const post = await createPostService({ 
        title,
        content,
        image,
        user 
    });
      return res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: post,
    });
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error in creating post",
        });
    }
}
   export async function findAllPosts(req, res) {
    try {
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 0;

        const paginatedPosts = await findAllPostsService(offset, limit);
        return res.status(200).json({
            success: true,
            message: "Posts fetched successfully",
            data: paginatedPosts,
        });
 } catch(error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error in fetching all the posts",
        });
    }
}

export async function deletePost(req, res) {
    try {
        const postId = req.params.id;
        const deletedPost = await deletePostService(postId,req.user);
        return res.status(200).json({
            success: true,
            message: "Post deleted successfully",
            data: deletedPost,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error in deleting post",
        });
    }
}

export async function updatePost(req, res) {
    try {
        const postId = req.params.id;
        const title = req.body.title;
        const content = req.body.content;
        const image = req.file ? req.file.path : req.body.image; 

        const updatedPost = await updatePostService(postId, title, content, image);

        return res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: updatedPost,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error in updating post",
        });

    }
}