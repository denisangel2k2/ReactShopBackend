import express from "express";
import {UserServices} from "../services/UserServices.js";
import UserModel from "../model/User.js";
import {IUser} from "../model/User.js";
import bodyParser from "body-parser";
import {uuid} from 'uuidv4';
import CartModel, {ICart} from "../model/Cart.js";
import {CartServices} from "../services/CartServices.js";

const userServices = new UserServices(UserModel);
const cartServices = new CartServices(CartModel);
const userRouter = express.Router();
const jsonParser = bodyParser.json();

/**
 * Route to login a user
 * @body email - user email
 * @body password - user password
 * @returns value - {token, email, cartId}
 *
 */
userRouter.post('/login', jsonParser, (request, response) => {
    userServices.login(request.body.email, request.body.password).then((data) => {
        response.json(data);
    });
});

/**
 * Route to register a user
 * @body email - user email
 * @body password - user password
 * @returns response - user data
 */
userRouter.post('/register', jsonParser, (request, response) => {
    try{
        const newToken: string = uuid();
        const user: IUser = {
            token: newToken,
            email: request.body.email,
            password: request.body.password,
            cartId: ''
        };
        userServices.saveUser(user).then(async (data) => {
            console.log(data._id);
            const newCart : ICart = {
                userId: String(data._id),
                total: 0,
                discountTotal: 0,
                totalProducts: 0,
                totalQuantity: 0,
                products: []
            }
            cartServices.saveCart(newCart).then(async (cart_data)=>{
                await userServices.updateCartIdForUser(String(cart_data._id),String(data._id));

            });
            response.status(200).json(data);
        });
    }
    catch (err) {
        response.status(500).send("Internal server error!");
    }

});

userRouter.post('/logout', jsonParser, (request, response) => {
    userServices.logout(request.headers.token as string).then((data) => {
        response.json(data);
    });
});

export default userRouter;
