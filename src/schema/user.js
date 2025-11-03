import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        minLength:6
    },

       email: {
          type: String,
          required: [true, "Email is required"],
          unique: true, // ensures no duplicate emails
          lowercase: true, // automatically converts email to lowercase
          match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please fill a valid email address",
    ],
  },

  role:{
    type:String,
    default:"user",
    enum:["user","admin"]
  },

   password: {
    type: String,
    required: true,
    minlength: 6,
  },
}, { timestamps:true });


const User = mongoose.model("user", userschema);

export default User