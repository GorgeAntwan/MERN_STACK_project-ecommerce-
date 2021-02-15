import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from "bcryptjs";
import generateToken from '../utils/generateToken.js';

//@desc:to Authinticate user
//@route: Post /api/users/login
//@access : Public
const userAuth = asyncHandler(async(req,res) => {
   
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(user&& (await user.matchPassword(password))){ 
          
        res.json({
            
            id :user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }else{
        res.status(401);
        throw new Error('Invalid Email or Password');
    }
});

//@desc:to get user profile
//@route: GET /api/users/profile
//@access : private
const getUserProfile = asyncHandler (async(req,res) => {
    const user = await User.findById(req.user._id).select('-password');
    if(user){ 
          
        res.json({
            
            id :user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }else{
        res.status(404);
        throw new Error('User Not Found');
    }
   
});


//@desc:to update user profile
//@route: PUT /api/users/profile
//@access : private
const updateUserProfile = asyncHandler (async(req,res) => {
    const user = await User.findById(req.user._id);
    if(user){ 
          user.name =req.body.name ||user.name;
          user.email =req.body.email || user.email;
          if(req.body.password){
              user.password = req.body.password;
          }
        const updatedUser = await user.save();
         

        res.json({
            id :updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
            token:generateToken(updatedUser._id)
        })
    }else{
        res.status(404);
        throw new Error('User Not Found');
    }
   
});

//@desc:to Authinticate user
//@route: Post /api/users
//@access : Public
const registerUser = asyncHandler(async(req,res)=>{
   const {name,email,password} =req.body;
    try {
    const existUser = await User.findOne({email});
    if(existUser){
        res.status(400);//response bad request.
        throw new Error('User alearady exist try login instead register')
    } 
    const user =await User.create({
        name,email,password
    });
     if(user){
        res.status(201).json({
            
            id :user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        });
        
    }else{
         res.status(400);
         throw new Error("faild to register user try again");
    }
   } catch (error) {
       console.log("🚀 ~ file: userController.js ~ line 59 ~ registerUser ~ error", error)
       res.status(400);//response bad request.
       throw new Error(error)
   }
});

//@desc:to get all user 
//@route: GET /api/users
//@access : private , Admin
const getUsers = asyncHandler (async(req,res) => {
    const user = await User.find({}).select('-password');
    if(user){ 
         

        res.json(user)
    }else{
        res.status(404);
        throw new Error('User Not Found'); 
    }
   
});


//@desc:to delete  user 
//@route: DELETE /api/users/:id
//@access : private , Admin
const deleteUser = asyncHandler (async(req,res) => {
    const user = await User.findById(req.params.id);
    if(user){ 
         
        await user.remove();
        res.json({message:'Success Remove User'})
    }else{
        res.status(404);
        throw new Error('User Not Found');
    }
   
});

//@desc:to get user by id 
//@route: GET /api/users/:id
//@access : private , Admin
const getUserById = asyncHandler (async(req,res) => {
    const user = await User.findById(req.params.id).select('-password');
    if(user){ 
         
      
        res.json(user);
    }else{
        res.status(404);
        throw new Error('User Not Found');
    }
   
});



//@desc:to update user  by user Id 
//@route: PUT /api/users/profile
//@access : private ,Admin
const updateUserById = asyncHandler (async(req,res) => {
    const user = await User.findById(req.params.id);
    if(user){ 

          user.name =req.body.name ||user.name;
          user.email =req.body.email || user.email;
          user.isAdmin = req.body.isAdmin ||user.isAdmin;
          const updatedUser = await user.save();
  
        res.json({
            id :updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
        })
    }else{
        res.status(404);
        throw new Error('User Not Found');
    }
   
});


export { userAuth, getUserProfile, updateUserProfile, registerUser,getUsers,deleteUser,getUserById,updateUserById };  