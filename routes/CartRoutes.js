import express from "express";
import { CartRepo } from "../repository/CartRepo.js";
import CartModel from "../model/Cart.js";
import bodyParser from "body-parser";
const cartRepository = new CartRepo(CartModel);
const jsonParser = bodyParser.json();
const cartRouter = express.Router();
cartRouter.post('/cart', jsonParser, (request, response) => {
    const id = request.body.token;
    const newCart = {
        userId: id,
        total: 0,
        discountTotal: 0,
        totalProducts: 0,
        totalQuantity: 0,
        products: []
    };
    cartRepository.saveCart(newCart).then((data) => {
        response.json(data);
    });
});
export default cartRouter;
