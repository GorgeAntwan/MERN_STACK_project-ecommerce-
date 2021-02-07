import express from 'express';
import  {
    addOrderItem,
    getOrderById
} from '../controllers/orderController.js';
import {protect} from '../middelware/authMiddelware.js';
const router =express.Router();

//@desc: Create New Order
//@route: POST /api/orders
//@access : Private

router.route('/').post(protect,addOrderItem);

//@desc: GET order by id
//@route: GET /api/orders
//@access : Private
router.route('/:id').get(protect,getOrderById);
export default router;