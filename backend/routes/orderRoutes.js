import express from 'express';
import  {
    addOrderItem,
    getOrderById,
    updateOrderToPayed,
    getMyOrder,
    getOrder,
    updateOrderToDelivered
} from '../controllers/orderController.js';
import {protect,admin} from '../middelware/authMiddelware.js';
const router =express.Router();

//@desc: Create New Order
//@route: POST /api/orders
//@access : Private

//@desc: get all order
//@route: GET /api/orders/
//@access : Private/Admin

router.route('/').post(protect,addOrderItem).get(protect,admin,getOrder);

//@desc: GET order by id
//@route: GET /api/orders
//@access : Private
router.route('/:id').get(protect,getOrderById);

//@desc: Update order order by id
//@route: PUT /api/orders/:id/pay
//@access : Private
router.route('/:id/pay').put(protect,updateOrderToPayed);

//@desc: get logged in user order
//@route: GET /api/orders/
//@access : Private
router.route('/').get(protect,admin,getMyOrder);

//@desc: Update order Delivered by id
//@route: PUT /api/orders/:id/deliver
//@access : Private
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered);
export default router;  