import {model, Schema} from "mongoose";
import {ICart} from "./Cart";

export interface IOrder {
    userId: string;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    date: string;
    cart: ICart;
}

const orderSchema = new Schema<IOrder>({
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

const OrderModel = model<IOrder>("orders", orderSchema);
export default OrderModel;