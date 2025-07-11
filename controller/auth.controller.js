import User from "../models/UserSchema.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const generateToken = (user) => {
   return jwt.sign({id:user._id, role:user.role}, process.env.JWT_CODE, {expiresIn:"5d"})
}

export const registerUser = async(req, res, next) => {
    const {userName, email, password, phone, profilePicture, role} = req.body
  
    try{
      let user = await User.findOne({email: email})
      if(user){
        return res.status(400).json({success:false, message:"User Already Exsist!"})
      }

      //password Encrption
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)  

      user = new User({
        userName,
        email,
        password : hashedPassword,
        phone,
        role,
        profilePicture
      })
      await user.save()
      return res.status(200).json({success:true, message:"User Created Successfully!"})
    }catch(err){
      return res.status(500).json({success:false, message:"Server Error"})
    }
}

export const login = async(req, res, next) => {
  const email = req.body.email
  console.log(email);
  

  try{
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({success:false, message:"User not found!"})
    }
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

    if(!isPasswordValid){
      return res.status(400).json({success:false, message:"Invalid Password!"})
    }
    const token = generateToken(user)
    const {password, role, ...rest} = user._doc
    res.status(200).json({success:true, message:"User login Successfully!", token, data:rest, role})
  }catch(err){
    return res.status(500).json({success:false, message:"Server Error"})
  }
}