import Post from '../schema/post.js'


export const createPost = async ({title, content, user, image}) => {
    try{
        const post = await Post.create({title, content, user, image});
        return post;
    }
    catch(error){
         console.log("DB Error:", error.message);
        throw error; 
    }
}

export const findAllPosts = async (offset, limit) => {
    try{
        const posts = await 
        Post.find().sort({createdAt:-1}).skip(offset).limit(limit).populate("user", "id username email");    
        return posts;
    }
    catch(error){
        console.log(error)
    }
}

export const countAllPosts = async () => {
    try{
      let count = await Post.countDocuments();
      return count;
    }
    catch(error){
        console.log(error)
    }
}

export const deletePost = async (id) => {
    try{
        const deletedPost = await Post.findByIdAndDelete(id)
        return deletedPost;
    }
    catch(error){
        console.log(error)
    }
}

export const updatePost = async (id,updateFields) => {
    try{
        const updatedPost = await Post.findByIdAndUpdate(id,updateFields, {new: true})
        return updatedPost;
    }
    catch(error){
        console.log(error)
    }
}

export const findPostById = async (id) => {
    try{
        const foundPost = await Post.findById(id);
        return foundPost;
    }
    catch(error){
        console.log(error)
    }
}