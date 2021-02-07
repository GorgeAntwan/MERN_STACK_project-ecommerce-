//import { errorHandler } from '../middelware/errorMiddelware.js';
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
 
//@desc: Fetch All Products
//@route: Get /api/products
//@access : Public
const getAllProduct = asyncHandler(async(req,res)=>{

    const products =await Product.find({});
    
    res.json(products);
});

//@desc: Fetch Singel Product
//@route: Get /api/products/:id
//@access : Public
const getProductById = asyncHandler(async(req,res)=>{
   
    const product = await Product.findById(req.params.id);
    
    if(product){
        console.log("🚀 ~ file: productRoutes.js ~ line 26 ~ router.get ~ product", `${product}`)
        res.json(product);
    }else{
        
        res.status(404);
        throw new Error('not found product with given id');

    }

});

export {
    getAllProduct,
    getProductById
}