import express from 'express';
import  {
    getAllProduct,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview
} from '../controllers/productCotroller.js';
import {protect,admin} from '../middelware/authMiddelware.js';
const router =express.Router();

//@desc: Fetch All Products
//@route: Get /api/products
//@access : Public

//@desc: CREATE  NEW PRODUCT  
//@route: POST /api/products
//@access : private ,admin

router.route('/').get(getAllProduct).post(protect,admin,createProduct);


//@desc: Fetch Singel Product
//@route: Get /api/products/:id
//@access : Public

//@desc: DELETE PRODUCT BY PRODUCT ID
//@route: Delete /api/products/:id
//@access : private ,admin

//@desc: UPDATE  PRODUCT  BY ID 
//@route: PUT /api/products/id
//@access : private ,admin

router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct);  

//@desc: CREATE  NEW PRODUCT  Review
//@route: POST /api/products/:id/reviews
//@access : private 

router.route('/:id/reviews').post(protect,createProductReview);

export default router;