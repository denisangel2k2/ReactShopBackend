import {model, Schema} from "mongoose";
import {ICart} from "./Cart";

export interface IOrder {
    userId: string;
    address: string;
    phone: string;
    cart: ICart;
}

const orderSchema = new Schema<IOrder>({
    userId: String,
    address: String,
    phone: String,
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

const OrderModel = model<IOrder>("orders", orderSchema);
export default OrderModel;