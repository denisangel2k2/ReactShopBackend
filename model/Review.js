import { model, Schema } from "mongoose";
const reviewSchema = new Schema({
    productId: Number,
    userId: String,
    rating: Number,
    title: String,
    comment: String
}), ReviewModel = model("reviews", reviewSchema);
export default ReviewModel;
