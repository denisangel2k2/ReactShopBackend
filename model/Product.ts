import {Schema, model, Model} from "mongoose";

export interface IProduct extends IEntity{
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: [string],
}

const productSchema= new Schema<IProduct>({
    id: Number,
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    brand: String,
    category: String,
    thumbnail: String,
    images: [String],
});

const ProductModel : Model<IProduct> =model("products",productSchema);
export default ProductModel;