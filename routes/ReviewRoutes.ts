import express from "express";
import ReviewModel from "../model/Review.js";
import {ReviewServices} from "../services/ReviewServices.js";
import bodyParser from "body-parser";


const reviewServices = new ReviewServices(ReviewModel),
    reviewRouter = express.Router(),
    jsonParser = bodyParser.json();

reviewRouter.post('/add', jsonParser, async (request, response) => {
    try {
        const review = request.body;
        const data = await reviewServices.addReview(review);
        response.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        response.status(200).json(data);
    } catch (error) {
        console.error("Error:", error);
        response.status(500).send("Internal server error");
    }
});

reviewRouter.delete('/delete/:reviewId', async (request, response) => {
    try {
        const reviewId = request.params.reviewId;
        const data = await reviewServices.deleteReview(reviewId);
        response.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        response.status(200).json(data);
    } catch (error) {
        console.error("Error:", error);
        response.status(500).send("Internal server error");
    }
});

reviewRouter.get('/user/:userId', async (request, response) => {
    try {
        const userId = request.params.userId;
        const data = await reviewServices.getReviewsByUserId(userId);
        response.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        response.status(200).json(data);
    } catch (error) {
        console.error("Error:", error);
        response.status(500).send("Internal server error");
    }
});

reviewRouter.get('/product/:productId', async (request, response) => {
    try {
        const productId = request.params.productId;
        const data = await reviewServices.getReviewsByProductId(productId);
        response.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        response.status(200).json(data);
    } catch (error) {
        console.error("Error:", error);
        response.status(500).send("Internal server error");
    }
});


export default reviewRouter;