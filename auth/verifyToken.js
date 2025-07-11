import User from "../models/UserSchema.model.js"
import jwt from "jsonwebtoken"

export const authentication = (req, res, next) => {
   const authToken = req.headers.authorization  //"Bearer jkdsflhsdifhlksdkhdskjksjdlk"
   
   if(!authToken || !authToken.startsWith("Bearer")){
    return res.status(401).json({status:false, message:"Authentication Failed"})
   }
   try{
    const token = authToken.split(" ")[1] //jkdsflhsdifhlksdkhdskjksjdlk
    const decoded = jwt.verify(token, process.env.JWT_CODE)
    req.userId = decoded.id
    req.role = decoded.role
    next()
   }catch(err){
      return res.status(500).json({success:false, message:"Server Error"})
   }
}

export const restrict = (roles) => async(req, res, next) => {
   try{
      const userId = req.userId
      const user = await User.findById(userId)
      
      if(!user){
         return res.status(401).json({success:false, message:"User not found"})
      }
      const userRole = user.role 
      
      if(userRole =="user" && roles.includes("user")){
         next()
      } else if(userRole =="admin" && roles.includes("admin")){ 
         console.log("restrict fn block");
         
         next()
      } else {
         return res.status(401).json({success:false, message:"You don't have permission to access this route"})
      }
   }catch(err){
      return res.status(500).json({success:false, message:"Server Error"})
   }
}