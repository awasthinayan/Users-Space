import { email } from 'zod';
import User from '../schema/user.js'

export const createUser = async (userobj) => {
    try {
        const user = new User(userobj);
        return await user.save();
    } catch (error) {
        console.log(error)
        throw error;
    }
}   

export const finduserbyemail = async (userDetails) => {
    try {
        const user = await User.findOne({email:userDetails.email})
        return user;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

// export const findallusers = async () => {
//     try {
//         const users = await User.find()
//         return users;  
//     } catch (error) {
//         console.log(error)
//     }
// }   

