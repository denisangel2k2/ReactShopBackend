import {Service} from "./Service.js";
import {IReview} from "../model/Review.js";
import {Model} from "mongoose";

export class ReviewServices extends Service<IReview> {
    constructor(reviewModel: Model<IReview>) {
        super(reviewModel);
    }

    public async getReviewsByProductId(productId: string): Promise<IReview[]> {
        return this.model.find({productId: productId}).then((data) => {
            return data;
        });
    }

    public async getReviewsByUserId(userId: string): Promise<IReview[]> {
        return this.model.find({userId: userId}).then((data) => {
            return data;
        });
    }

    public async addReview(review: IReview): Promise<IReview> {
        return this.model.create(review).then((data) => {
            return data;
        });
    }

    public async deleteReview(reviewId: string): Promise<IReview | null>  {
        return this.model.findByIdAndDelete(reviewId).then((data) => {
            return data;
        });
    }
}