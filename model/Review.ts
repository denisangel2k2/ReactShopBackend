import {model, Schema} from "mongoose";

export interface IReview extends IEntity {
    productId: number;
    userId: string;
    rating: number;
    title: string;
    comment: string;
}

const reviewSchema = new Schema<IReview>({
        productId: Number,
        userId: String,
        rating: Number,
        title: String,
        comment: String
    }),

    ReviewModel = model<IReview>("reviews", reviewSchema);

export default ReviewModel;