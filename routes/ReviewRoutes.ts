import express from "express";
import bodyParser from "body-parser";
import ReviewModel, {IReview} from "../model/Review.js";
import {ReviewServices} from "../services/ReviewServices.js";
import {UserServices} from "../services/UserServices.js";
import UserModel from "../model/User.js";


const reviewServices = new ReviewServices(ReviewModel),
    userServices = new UserServices(UserModel),
    reviewRouter = express.Router(),
    jsonParser = bodyParser.json();

/**
 * Route serving all reviews.
 */
reviewRouter.post('/add', jsonParser, async (request, response) => {
    const token: string = request.headers['token'] as string;
    if (token === "") {
        console.log('1',token);
        response.status(404).send("Invalid session!");
        return;
    }
    console.log(token);
    const user = await userServices.findUserFromToken(token as string),
        user_id = user ? user._id : null;

    if (!user_id) {
        console.log('2', user_id);
        response.status(404).send("Invalid session!");
        return;
    }

    else{

    }
    try {
        // const review = request.body;
        const review: IReview = {
            productId: request.body.productId,
            userId: String(user_id),
            rating: request.body.rating,
            comment: request.body.comment,
            title: request.body.title
        }
        const data = await reviewServices.addReview(review);
        response.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        response.status(200).json(data);
    } catch (error) {
        console.error("Error:", error);
        response.status(500).send("Internal server error");
    }
});

/**
 * Route that deletes a review by reviewId.
 */
reviewRouter.delete('/delete/:reviewId', async (request, response) => {
    const token: string = request.headers['token'] as string;
    if (token === "") {
        response.status(404).send("Invalid session!");
        return;
    }
    const user = await userServices.findUserFromToken(token as string),
        userId = user ? user.id : null;

    if (!userId) {
        response.status(404).send("Invalid session!");
        return;
    }

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

/**
 * Route that gets all reviews by userId.
 */
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
/**
 * Route that gets all reviews by productId.
 */
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