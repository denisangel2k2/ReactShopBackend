import OrderModel from '../model/Order.js';
import { Router } from 'express';
import { OrderServices } from "../services/OrderServices.js";
import bodyParser from "body-parser";
import CartModel from "../model/Cart.js";
import { CartServices } from "../services/CartServices.js";
import { UserServices } from "../services/UserServices.js";
import UserModel from "../model/User.js";
const orderServices = new OrderServices(OrderModel);
const cartServices = new CartServices(CartModel);
const userServices = new UserServices(UserModel);
const jsonParser = bodyParser.json();
const orderRouter = Router();
/**
 * Format date to custom string
 * @param date - date to format
 */
function formatDateToCustomString(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}
/**
 * Create a new order for a user and clear the cart
 * @header token - user token
 * @body phone - user phone
 * @body address - user address
 * @body firstName - user first name
 * @body lastName - user last name
 * @return 200 - order created
 * @return 400 - cart is empty
 * @return 404 - cart not found
 * @return 404 - user not found
 * @return 500 - internal server error
 */
orderRouter.post('/', jsonParser, async (req, res) => {
    try {
        const token = req.headers['token'];
        const { phone, address, firstName, lastName } = req.body;
        const user = await userServices.findUserFromToken(token);
        if (user) {
            let order;
            const cart = await cartServices.findByUserId(String(user._id));
            if (cart) {
                order = {
                    userId: String(user._id),
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone,
                    address: address,
                    date: formatDateToCustomString(new Date()),
                    cart: cart
                };
                if (cart.totalProducts === 0)
                    return res.status(400).send("Cart is empty!");
                orderServices.saveOrder(order).then((result) => {
                    console.log(String(cart._id));
                    cartServices.deleteAllProductsFromCart(String(cart._id)).then((result) => {
                        res.status(200).send(result);
                    });
                });
            }
            else
                res.status(404).send("Cart not found!");
        }
        else
            res.status(404).send("User not found!");
    }
    catch (err) {
        res.status(500).send("Internal server error!");
    }
});
/**
 * Get all orders for a user
 * @header token - user token
 * @return 200 - orders found
 * @return 404 - user not found
 * @return 500 - internal server error
 */
orderRouter.get('/', jsonParser, async (req, res) => {
    try {
        const token = req.headers['token'], user = await userServices.findUserFromToken(token);
        if (user) {
            orderServices.findOrdersByUserId(user.id).then((result) => {
                res.status(200).send(result);
            }).catch((err) => {
                res.status(500).send(err);
            });
        }
        else
            res.status(404).send("User not found!");
    }
    catch (err) {
        res.status(500).send("Internal server error!");
    }
});
export default orderRouter;
