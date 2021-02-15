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

//@desc: DELETE PRODUCT BY PRODUCT ID
//@route: Delete /api/products/:id
//@access : private ,admin
const deleteProduct = asyncHandler(async(req,res)=>{
   
    const product = await Product.findById(req.params.id);
    
    if(product){
        
        await product.remove();
        res.json({message: 'Product Removed'});
    }else{
        
        res.status(404);
        throw new Error('not found product with given id');

    }

});


//@desc: UPDATE  PRODUCT  BY ID 
//@route: PUT /api/products/id
//@access : private ,admin
const updateProduct = asyncHandler(async(req,res)=>{
   
    
    const {name,price,image,description,brand,category,countInStock} =req.body;
    const product = await Product.findById(req.params.id);
    
    if(product){

        product.name =name||product.name;
        product.price =price||product.price;
        product.image =image||product.image; 
        product.description =description||product.description;
        product.brand =brand||product.brand;
        product.category =category||product.category;
        product.countInStock =countInStock||product.countInStock;
        const updatedProduct = await product.save();
        res.json(updatedProduct);

    }else{
        
        res.status(404);
        throw new Error('not found product with given id');

    }

});

//@desc: CREATE  NEW PRODUCT  
//@route: POST /api/products
//@access : private ,admin
const createProduct = asyncHandler(async(req,res)=>{
   
    const product = new Product( {
        
         numReviews: 0,
         price: 0,
         countInStock: 0,
         name: "Simple name",
         image: "/images/alexa.jpg",
         description: "simple description",
         brand: "simple brand",
         category: "simple category",
         user: req.user._id,
        
    });
    
    if(product){
        
        const createdProduct= await product.save();
        res.status(201).json(createdProduct);
    }else{
        
        res.status(404);
        throw new Error('not found product with given id');

    }

});
export {
    getAllProduct,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
}