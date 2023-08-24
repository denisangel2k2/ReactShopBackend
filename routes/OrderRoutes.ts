import OrderModel, {IOrder} from '../model/Order.js';

import {Router} from 'express';
import {OrderServices} from "../services/OrderServices.js";
import bodyParser from "body-parser";
import CartModel from "../model/Cart.js";
import {CartServices} from "../services/CartServices.js";
import {UserServices} from "../services/UserServices.js";
import UserModel from "../model/User.js";

const orderServices = new OrderServices(OrderModel);
const cartServices = new CartServices(CartModel);
const userServices = new UserServices(UserModel);

const jsonParser = bodyParser.json();
const orderRouter = Router();

orderRouter.post('/', jsonParser, async (req, res) => {
    try {
        const token = req.body.token;
        const phone = req.body.phone;
        const address = req.body.address;

        const user = await userServices.findUserFromToken(token);
        if (user) {
            let order: IOrder;
            const cart = await cartServices.findByUserId(String(user._id));
            if (cart && user) {
                order = {
                    userId: String(user._id),
                    phone: phone,
                    address: address,
                    cart: cart
                }
                if (cart.totalProducts === 0) return res.status(400).send("Cart is empty!");
                orderServices.saveOrder(order).then((result)=>{
                    //TODO: delete all products from cart
                    res.status(200).send(result);
                });

            } else res.status(404).send("Cart not found!");
        } else res.status(404).send("User not found!");
    } catch (err) {
        res.status(500).send("Internal server error!");
    }
});

export default orderRouter;

