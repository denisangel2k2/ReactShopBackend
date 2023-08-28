import { Service } from "./Service.js";
export class ReviewServices extends Service {
    constructor(reviewModel) {
        super(reviewModel);
    }
    async getReviewsByProductId(productId) {
        return this.model.find({ productId: productId }).then((data) => {
            return data;
        });
    }
    async getReviewsByUserId(userId) {
        return this.model.find({ userId: userId }).then((data) => {
            return data;
        });
    }
    async addReview(review) {
        return this.model.create(review).then((data) => {
            return data;
        });
    }
    async deleteReview(reviewId) {
        return this.model.findByIdAndDelete(reviewId).then((data) => {
            return data;
        });
    }
}
