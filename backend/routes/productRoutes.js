import express from 'express';
import  {
    getAllProduct,
    getProductById
} from '../controllers/productCotroller.js';
const router =express.Router();
//@desc: Fetch All Products
//@route: Get /api/products
//@access : Public

router.route('/').get(getAllProduct);

//@desc: Fetch Singel Product
//@route: Get /api/products/:id
//@access : Public

router.route('/:id').get(getProductById);  
export default router;