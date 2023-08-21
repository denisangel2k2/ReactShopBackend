import { model, Schema } from "mongoose";
const cartSchema = new Schema({
    userId: String,
    total: Number,
    discountTotal: Number,
    totalProducts: Number,
    totalQuantity: Number,
    products: [{
            id: Number,
            title: String,
            description: String,
            price: Number,
            discountedPercentage: Number,
            rating: Number,
            stock: Number,
            thumbnail: String,
            quantity: Number,
            total: Number,
            discountedPrice: Number
        }]
});
const CartModel = model("carts", cartSchema);
export default CartModel;
