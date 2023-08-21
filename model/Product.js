import { Schema, model } from "mongoose";
const productSchema = new Schema({
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
const ProductModel = model("products", productSchema);
export default ProductModel;
