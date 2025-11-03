import { th } from "zod/locales";
import { countAllPosts, createPost, deletePost, findAllPosts, updatePost } from "../repositories/postRepo.js";
import User from "../schema/user.js";
import Post from "../schema/post.js";

export const createPostService = async (createPostObject) => {
  try {
    const { title, content, image, user } = createPostObject;

    // Create post in DB
    const post = await createPost({ title, content: content?.trim(), image, user });

    return post; // Return the created post
    
  } catch (error) {
    console.log("Service Error:", error);
    throw error;
  }
};

export const findAllPostsService = async () => {
    try
    {
    const posts = await findAllPosts();

    const totalDocuments = await countAllPosts();
    const totalPages = Math.ceil(totalDocuments / 10);
    
    return { posts, totalDocuments, totalPages };   
    }
    catch(error)
    {
        console.log(error)
        throw new Error("Error in fetching posts"); 
    }
}

export const deletePostService = async (id,user) => {
  try {

      console.log("🟢 Received Post ID:", id);
    console.log("🟢 Logged-in User:", user);

    if(!id){
        throw new Error("Post id is required");
    }

    //find the post by id
    const post = await Post.findById(id);
    console.log("post found",post);

       if (!post) {
      throw new Error("Post not found");
    }
     if (post.user.toString() !== user.id) {
      throw new Error("You are not authorized to delete this post");
    }

    const deletedPost = await deletePost(id);

    if(!deletedPost){
        throw new Error("Post not found");
    }
    return deletedPost;
  } catch (error) {
    console.log(error);
    throw new Error("Error in deleting post");
  }
};

export const updatePostService = async (id, title, content, image) => {
  try {

   if(!id || !title || !content || !image){
        throw new Error("All the fields are required");
    } 

    const updateFields = {};

if (title) updateFields.title = title;
if (content) updateFields.content = content;
if (image) updateFields.image = image;

    const updatedPost = await updatePost(id, updateFields);

    if(!updatedPost){
        throw new Error("Post has not been updated");
    }

    console.log(updatedPost);

    return updatedPost;

  } catch (error) {
    console.log(error);
    throw new Error("Error in updating post");
  }
};