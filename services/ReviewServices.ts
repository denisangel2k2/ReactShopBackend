import {Service} from "./Service.js";
import {IReview} from "../model/Review.js";
import {Model} from "mongoose";

export class ReviewServices extends Service<IReview> {
    constructor(reviewModel: Model<IReview>) {
        super(reviewModel);
    }

    /**
     * Gets all reviews from productId
     * @param productId
     * @returns {Promise<IReview[]>}
     */
    public async getReviewsByProductId(productId: string): Promise<IReview[]> {
        return this.model.find({productId: productId}).then((data) => {
            return data;
        });
    }

    /**
     * Gets all reviews from userId
     * @param userId
     * @returns {Promise<IReview[]>}
     */
    public async getReviewsByUserId(userId: string): Promise<IReview[]> {
        return this.model.find({userId: userId}).then((data) => {
            return data;
        });
    }

    /**
     * Adds a review to the database
     * @param review
     * @returns {Promise<IReview>}
     */
    public async addReview(review: IReview): Promise<IReview> {
        return this.model.create(review).then((data) => {
            return data;
        });
    }

    /**
     * Deletes a review from the database
     * @param reviewId
     * @returns {Promise<IReview | null>}
     */
    public async deleteReview(reviewId: string): Promise<IReview | null>  {
        return this.model.findByIdAndDelete(reviewId).then((data) => {
            return data;
        });
    }
}