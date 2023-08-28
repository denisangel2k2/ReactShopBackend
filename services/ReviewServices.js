import { Service } from "./Service.js";
export class ReviewServices extends Service {
    constructor(reviewModel) {
        super(reviewModel);
    }
    /**
     * Gets all reviews from productId
     * @param productId
     * @returns {Promise<IReview[]>}
     */
    async getReviewsByProductId(productId) {
        return this.model.find({ productId: productId }).then((data) => {
            return data;
        });
    }
    /**
     * Gets all reviews from userId
     * @param userId
     * @returns {Promise<IReview[]>}
     */
    async getReviewsByUserId(userId) {
        return this.model.find({ userId: userId }).then((data) => {
            return data;
        });
    }
    /**
     * Adds a review to the database
     * @param review
     * @returns {Promise<IReview>}
     */
    async addReview(review) {
        return this.model.create(review).then((data) => {
            return data;
        });
    }
    /**
     * Deletes a review from the database
     * @param reviewId
     * @returns {Promise<IReview | null>}
     */
    async deleteReview(reviewId) {
        return this.model.findByIdAndDelete(reviewId).then((data) => {
            return data;
        });
    }
}
