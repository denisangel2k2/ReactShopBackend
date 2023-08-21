import {IProduct} from "./Product";
import {model, Schema} from "mongoose";
interface ICartProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    discountedPercentage: number;
    rating: number;
    stock: number;
    thumbnail: string;
    quantity: number;
    total: number;
    discountedPrice: number;
}
export interface ICart extends IEntity {
    userId: string;
    total: number;
    discountTotal: number;
    totalProducts: number;
    totalQuantity: number;
    products: ICartProduct[];
}

const cartSchema = new Schema<ICart>({
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
const CartModel = model<ICart>("carts", cartSchema);
export default CartModel;
