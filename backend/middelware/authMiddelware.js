import asyncHandler from 'express-async-handler';
import jwt from  'jsonwebtoken';
import User from '../models/userModel.js';

const protect = asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
         try {
             token = req.headers.authorization.split(' ')[1];
             const decoded = jwt.verify(token,process.env.JWT_TOKEN);
             console.log("🚀 ~ file: authMiddelware.js ~ line 10 ~ protected ~ decoded", decoded);
             req.user =await User.findById(decoded.id).select('-password');
             console.log("🚀 ~ file: authMiddelware.js ~ line 13 ~ protect ~ req.user", req.user)
             
              
         } catch (error) {
             //if the token incorrect
            console.log("🚀 ~ file: authMiddelware.js ~ line 15 ~ protected ~ error", error);
            res.status(401);
            throw new Error("Not Authorized token faild");
             
         }
    }
    if(!token){
        res.status(401);
        throw new Error('Not authorized not found token');
    }
    next();
    
});

export {
    protect
};