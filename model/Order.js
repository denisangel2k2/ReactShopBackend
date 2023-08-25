import { model, Schema } from "mongoose";
const orderSchema = new Schema({
    userId: String,
    firstName: String,
    lastName: String,
    address: String,
    phone: String,
    date: String,
    cart: {
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
    }
});
const OrderModel = model("orders", orderSchema);
export default OrderModel;
