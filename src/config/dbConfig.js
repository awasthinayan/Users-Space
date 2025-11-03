import mongoose from 'mongoose'
import { DB_URL } from './serverconfig.js'

export default async function connectDB(){
    try{
        await mongoose.connect(DB_URL)
        console.log("connected to the database")
    }
    catch(err){
        console.log("Something went wrong")
        console.log(err)
    }
}

