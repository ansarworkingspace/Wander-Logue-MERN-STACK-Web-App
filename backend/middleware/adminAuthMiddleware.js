import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Admin from '../models/adminModels.js'



const protect = asyncHandler(async(req,res,next)=>{
   let token;

   token = req.cookies.adminJwt;

   if(token){
  try {
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
     req.admin = await Admin.findById(decoded.adminId).select('-password');
    
     next()
   } catch (error) {
     res.status(401)
     throw new Error('Not authorized, Invalid Token');
   } 
   }else{
     res.status(401);
     throw new Error('Not authorized, no token');
   }
});

export { protect };