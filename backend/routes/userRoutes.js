import express from 'express';
import {userAuth,getUserProfile,registerUser, updateUserProfile,getUsers, deleteUser,getUserById,updateUserById} from '../controllers/userController.js';
import {protect,admin} from '../middelware/authMiddelware.js';
const router = express.Router();

//@desc:to Authinticate user
//@route: Post /api/user/login
//@access : Public 
router.route('/login').post(userAuth);

//@desc:to Authinticate user and register
//@route: Post /api/user
//@access : Public 
router.route('/').post(registerUser);

//@desc:to get user profile 
//@route: get /api/user/profile
//@access : private 
//@desc:to update user profile
//@route: PUT /api/users/profile
//@access : private
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);

//@desc:to get all user 
//@route: GET /api/users
//@access : private , Admin
router.route('/').get(protect,admin,getUsers);

//@desc:to delete  user 
//@route: DELETE /api/users/:id
//@access : private , Admin 

//@desc:to get user by id 
//@route: GET /api/users/:id
//@access : private , Admin

//@desc:to update user  by user Id 
//@route: PUT /api/users/profile
//@access : private ,Admin
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUserById);  

export default router; 
 