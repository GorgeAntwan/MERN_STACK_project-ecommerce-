import  Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';
 
//@desc: Create New Order
//@route: POST /api/orders
//@access : Private
const addOrderItem = asyncHandler(async(req,res)=>{

    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } =req.body;
    if(orderItems&&orderItems.length===0){
        res.status(400) 
        throw new Error('No Order Items')
        return;
    }else{
        const order = new Order({

            orderItems,
            user:req.user._id,
            shippingAddress,
            paymentMethod,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });
        const createdOrder = await order.save();
        return res.status(201).json(createdOrder);
    }
    res.json(products);
});
//@desc: GET order by id
//@route: GET /api/orders
//@access : Private
const getOrderById = asyncHandler(async(req,res)=>{

   
    const order =await Order.findById(req.params.id).populate('user','name email');
    if(order){
        res.status(200).json(order);
    } else{
        res.status(400);
        throw new Error('not found order');
    }   

});

export  {addOrderItem,getOrderById};