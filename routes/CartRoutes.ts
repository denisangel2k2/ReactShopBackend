import express from "express";
import {CartServices} from "../services/CartServices.js";
import CartModel, {ICart, ICartProduct} from "../model/Cart.js";
import bodyParser from "body-parser";
import {ProductServices} from "../services/ProductServices.js";
import ProductModel from "../model/Product.js";
import UserModel from "../model/User.js";
import {UserServices} from "../services/UserServices.js";

const cartServices = new CartServices(CartModel);
const productServices = new ProductServices(ProductModel);
const userServices = new UserServices(UserModel);

const jsonParser = bodyParser.json();

const cartRouter = express.Router();

cartRouter.get("/:cartId", jsonParser, async (req, res) => {
    const cartId = req.params.cartId;
    try {
        const user = await userServices.findUserFromToken(req.headers['token'] as string),
        userId = user ? user.id : null,
        userIdForCart = await cartServices.getCartUserId(cartId);

        if (!userId || userId !== userIdForCart) {
            res.status(404).send("Invalid session!");
        } else {
            const result = await cartServices.findById(cartId);
            res.status(200).send(result);
        }
    }
    catch (err) {
        res.status(500).send("Internal server error!");
    }
});
cartRouter.put("/:cartId", jsonParser, async (req, res) => {
    try{
        const products = req.body.products,
        cartId = req.params.cartId,
        user = await userServices.findUserFromToken(req.body.token),
        userId = user ? user.id : null,
        userIdForCart = await cartServices.getCartUserId(cartId);

        if (!userId || userId !== userIdForCart) {
            res.status(404).send("Invalid session!");
        } else {
            for (let i = 0; i < products.length; i++) {
                const productId = products[i].id;
                const productQuantity = products[i].quantity;
                const product = await productServices.getProduct(productId);
                if (product) {
                    const cartProduct: ICartProduct = {
                        id: product.id,
                        title: product.title,
                        description: product.description,
                        price: product.price,
                        discountedPercentage: product.discountPercentage,
                        rating: product.rating,
                        stock: product.stock,
                        thumbnail: product.thumbnail,
                        quantity: productQuantity,
                        total: product.price * productQuantity,
                        discountedPrice: product.price * productQuantity * (1 - product.discountPercentage / 100)
                    };
                    console.log(cartProduct)
                    cartServices.updateCart(cartProduct, cartId, userId).then((result) => {
                        res.send(result);
                    })
                        .catch((err) => {
                            res.status(500).send(err);
                        });
                } else {
                    res.status(404).send("Product not found!");
                }
            }
        }
    }
    catch (err) {
        res.status(500).send("Internal server error!");
    }

});
cartRouter.delete("/:cartId", jsonParser, async (req, res) => {
    try{
        const productId = req.body.product_id;
        const cartId = req.params.cartId;
        const user = await userServices.findUserFromToken(req.body.token);
        const userId = user ? user.id : null;

        if (!userId) {
            res.status(404).send("Invalid session!");
        } else {
            const product = await productServices.getProduct(productId);
            if (product) {
                cartServices.deleteProductFromCart(productId, cartId, userId).then((result) => {
                    res.status(200).send(result);
                });
            } else {
                res.status(404).send("Product not found!");
            }
        }
    }
    catch (err){
        res.status(500).send("Internal server error!");
    }


});
export default cartRouter;