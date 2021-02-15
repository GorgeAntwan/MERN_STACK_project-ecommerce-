import express from 'express';
import  {
    addOrderItem,
    getOrderById,
    updateOrderToPayed,
    getMyOrder
} from '../controllers/orderController.js';
import {protect,admin} from '../middelware/authMiddelware.js';
const router =express.Router();

//@desc: Create New Order
//@route: POST /api/orders
//@access : Private

router.route('/').post(protect,addOrderItem);

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
export default router;  