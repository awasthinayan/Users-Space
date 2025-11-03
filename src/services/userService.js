import { createUser, finduserbyemail } from "../repositories/userRepo.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

export const createUserService = async (userobj) => {
   try{
   const { username, email, password } = userobj;

     if (!username || !email || !password) {
         throw new Error("Username, email, and password are required");
      }
      
   // hash password
   const hashedPassword = await bcrypt.hash(password, 10);

   // create user
   const user = await createUser({
      username,
      email,
      password: hashedPassword,
   });

   return user;
}
catch(error){
   console.log(error)
   throw error;
}
};  

export const signinUserService = async (userDetails) => {
   try{
      const user = await finduserbyemail({email:userDetails.email});
      if (!user) {
         throw {
            message: "User not found",
            status: 404,
         }
      }

      const isPasswordMatch = await bcrypt.compare(userDetails.password, user.password);

      if (!isPasswordMatch) {
         throw {
            message: "Invalid password",
            status: 401,
         }
      }

      const token = generateToken({email: user.email, username: user.username, id: user._id, role:user.role || "user"});
      return token;
   }
   catch(error){
      console.log(error)
      throw{
         message: "Something went wrong",
         status: 500,
      }
   }
};

export const checkifuserexistsService = async (email) => {
    try{
        const user = await finduserbyemail({email:email});
        if (!user) {
            throw {
                message: "User not found",
                status: 404,
            }
        }
        else{
            return user;
        }
    }
    catch{
        console.log(error)
        throw{
            message: "Something went wrong",
            status: 500,
        }
    }
   }