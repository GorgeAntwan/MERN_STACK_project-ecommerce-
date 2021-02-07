import express from 'express';
import {userAuth,getUserProfile,registerUser, updateUserProfile} from '../controllers/userController.js';
import {protect} from '../middelware/authMiddelware.js';
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

export default router;
 