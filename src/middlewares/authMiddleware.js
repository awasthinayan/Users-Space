import { checkifuserexistsService } from '../services/userService.js';
import { verifyJWT } from '../utils/jwt.js';

export default async function authMiddleware(req, res, next) {
  try
  {
    //check if token is present in header
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    
    //check if token is valid
    if(!token){
        console.log("No token provided.")
        return res.status(401).json({ 
            message: 'No token provided.',
            success: false,
        })
    }

    //verify the token

    const response = verifyJWT(token)

    const doesuserexist = await checkifuserexistsService(response.email);
    
    if(!doesuserexist){
        return res.status(401).json({
            message: 'user does not found',
            success: false
        })
    }

    req.user = response;
    console.log(response)
    next();
  }
  catch(error){
    res.status(401).json({

        message: 'Auth failed',
        success: false
    })  
    console.log(error);
  }
}

export const isAdmin = async (req, res, next) => {
  if(req.user.role !== "admin"){
    return res.status(401).json({
      message: "You are not authorized to access this route",
      success: false,
    });
  }
  else{
    next();   
  }
}
 