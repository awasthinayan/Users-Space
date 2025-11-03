import multer from "multer";
import cloudinary from "../config/cloudinaryConfig.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Define storage directly on Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "my_uploads", // Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png"], // file types allowed
    public_id: (req, file) => {

      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return Error("Invalid file type");
      }
      //if fike not found
      if(!file.fieldname || file.fieldname.length === 0){
        return Error("Invalid file name");
      }

      if(!file){
        return Error("please give a file");
      }

      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      return file.fieldname + "-" + uniqueSuffix;
    },
  },
});

export const upload = multer({ storage });
