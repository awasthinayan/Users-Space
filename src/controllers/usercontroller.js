import { response } from "express";
import { createUserService, signinUserService } from "../services/userService.js";

export const createUserController = async (req, res) => {
    try{
        const user = await createUserService(req.body)
        return res.status(201).json({
            message: "User created successfully",
            success: true,
            data: user,
        })
       
    }
    catch(error){
        console.log(req.body)
       return  res.status(400).json({
            message: error.message,
            success: false,
        })
    }
}

export const signinUserController = async (req, res) => {
    try{

        const response = await signinUserService(req.body);
        return res.status(200).json({
            message: "User signed in successfully",
            success: true,
            data: response
        })
    }
    catch(error){
        return res.status(400).json({
            message: error.message,
            success: false,
        })
    }
}

