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

//@desc: Update order order by id
//@route: PUT /api/orders/:id/pay
//@access : Private
const updateOrderToPayed = asyncHandler(async(req,res)=>{

   
    const order =await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id:req.body.id,
            status : req.body.status,
            update_time :req.body.update_time,
            email_address : req.body.payer.email_address
            
        }
        const updateOrdr = await order.save();
        res.status(200).json(updateOrdr);
    } else{
        res.status(400);
        throw new Error('not found order');
    }   

});
//@desc: get logged in user order
//@route: GET /api/orders/
//@access : Private
const getMyOrder = asyncHandler(async(req,res)=>{
   
    console.log("🚀 ~ file: orderController.js ~ line 84 ~ getMyOrder ~ req", req.user._id);
    
    const order =await Order.find({ user: req.user._id});
    console.log("🚀 ~ file: orderController.js ~ line 87 ~ getMyOrder ~ order", order)
    if(order){
      
        res.status(200).json(order);
    } else{
        res.status(400);
        throw new Error('not found order');
    }   

});

export  {addOrderItem,getOrderById,updateOrderToPayed,getMyOrder};