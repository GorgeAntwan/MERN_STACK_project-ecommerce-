import mongoose from 'mongoose';
import dotEnv from 'dotenv';
import Colors from 'colors';
import productData from './data/products.js';
import userData from './data/users.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotEnv.config();

connectDB();

const importData =async ()=>{

    try{
       await User.deleteMany();
       await Order.deleteMany();
       await Product.deleteMany();

       const createdUsers = await User.insertMany(userData);
       const adminUser = createdUsers[0]._id;
       const sampleProducts = productData.map(product=>{
           return{...product,user:adminUser}
        });
        await Product.insertMany(sampleProducts);
        console.log("🚀 ~ file: seeder.js ~ line 28 ~ importData ".green.inverse)
         process.exit();
   } catch (error) {

      console.log(`🚀 ~ file: seeder.js ~ line 31 ~ importData ~ error :${error.message}`.red.inverse );
      process.exit(1);
   }
};
const destoryData = async ()=>{
     
   try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("🚀 ~ file: seeder.js ~ line 42 ~ destoryData ~ User ,Order ,Product".red.inverse)
    process.exit();
   } catch (error) {
      console.log(`🚀 ~ file: seeder.js ~ line 43 ~ destoryData ~:${error.message}`.red.inverse)
      process.exit(1);
   }
};
if(process.argv[2]==='-d'){
    destoryData();
}else{
    importData();
}