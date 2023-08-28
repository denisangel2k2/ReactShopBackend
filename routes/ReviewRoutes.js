import express from "express";
import bodyParser from "body-parser";
import ReviewModel from "../model/Review.js";
import { ReviewServices } from "../services/ReviewServices.js";
import { UserServices } from "../services/UserServices.js";
import UserModel from "../model/User.js";
const reviewServices = new ReviewServices(ReviewModel), userServices = new UserServices(UserModel), reviewRouter = express.Router(), jsonParser = bodyParser.json();
/**
 * Route serving all reviews.
 */
reviewRouter.post('/add', jsonParser, async (request, response) => {
    const token = request.headers['token'];
    if (token === "") {
        response.status(404).send("Invalid session!");
        return;
    }
    const user = await userServices.findUserFromToken(token), userId = user ? user._id : null;
    if (!userId) {
        response.status(404).send("Invalid session!");
        return;
    }
    try {
        const review = request.body;
        const data = await reviewServices.addReview(review);
        response.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        response.status(200).json(data);
    }
    catch (error) {
        console.error("Error:", error);
        response.status(500).send("Internal server error");
    }
});
/**
 * Route that deletes a review by reviewId.
 */
reviewRouter.delete('/delete/:reviewId', async (request, response) => {
    const token = request.headers['token'];
    if (token === "") {
        response.status(404).send("Invalid session!");
        return;
    }
    const user = await userServices.findUserFromToken(token), userId = user ? user.id : null;
    if (!userId) {
        response.status(404).send("Invalid session!");
        return;
    }
    try {
        const reviewId = request.params.reviewId;
        const data = await reviewServices.deleteReview(reviewId);
        response.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        response.status(200).json(data);
    }
    catch (error) {
        console.error("Error:", error);
        response.status(500).send("Internal server error");
    }
});
/**
 * Route that gets all reviews by userId.
 */
reviewRouter.get('/user/:userId', async (request, response) => {
    try {
        const userId = request.params.userId;
        const data = await reviewServices.getReviewsByUserId(userId);
        response.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        response.status(200).json(data);
    }
    catch (error) {
        console.error("Error:", error);
        response.status(500).send("Internal server error");
    }
});
/**
 * Route that gets all reviews by productId.
 */
reviewRouter.get('/product/:productId', async (request, response) => {
    try {
        const productId = request.params.productId;
        const data = await reviewServices.getReviewsByProductId(productId);
        response.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        response.status(200).json(data);
    }
    catch (error) {
        console.error("Error:", error);
        response.status(500).send("Internal server error");
    }
});
export default reviewRouter;
