import express from "express";
import { ProductServices } from "../services/ProductServices.js";
import ProductModel from "../model/Product.js";
const productRepository = new ProductServices(ProductModel);
const productRouter = express.Router();
productRouter.get('/', async (request, response) => {
    try {
        const limit = Number(request.query.limit);
        const skip = Number(request.query.skip);
        if (limit < 1 || skip < 0) {
            return response.status(400).send("Bad request");
        }
        let data;
        if (request.query.limit || request.query.skip) {
            data = await productRepository.findWithLimitAndSkip(limit, skip);
        }
        else {
            data = await productRepository.findAll();
        }
        response.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        response.status(200).json(data);
    }
    catch (error) {
        console.error("Error:", error);
        response.status(500).send("Internal server error");
    }
});
productRouter.get('/category/:category', async (request, response) => {
    try {
        const limit = Number(request.query.limit);
        const skip = Number(request.query.skip);
        if ((isNaN(limit) && isNaN(skip)) || limit < 1 || skip < 0) {
            return response.status(400).send("Bad request");
        }
        let data;
        if (request.query.limit || request.query.skip) {
            data = await productRepository.findWithLimitAndSkip(limit, skip, request.params.category);
        }
        else {
            data = await productRepository.findByCategory(request.params.category);
        }
        response.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        response.status(200).json(data);
    }
    catch (error) {
        console.error("Error:", error);
        response.status(500).send("Internal server error");
    }
});
productRouter.get('/title/:title', async (request, response) => {
    try {
        const limit = Number(request.query.limit);
        const skip = Number(request.query.skip);
        if (limit < 1 || skip < 0) {
            return response.status(400).send("Bad request");
        }
        let data;
        if (isNaN(limit) && isNaN(skip))
            data = await productRepository.findByTitle(request.params.title, 0);
        else
            data = await productRepository.findByTitle(request.params.title, limit, skip);
        response.json(data);
    }
    catch (error) {
        console.error("Error:", error);
        response.status(500).send("Internal server error");
    }
});
productRouter.get('/number', async (request, response) => {
    try {
        const data = await productRepository.getNumberOfProducts('');
        response.json(data);
    }
    catch (error) {
        console.log("Error:", error);
        response.status(500).send("Internal server error!!!!");
    }
});
productRouter.get('/:productId', async (request, response) => {
    try {
        const productId = request.params.productId;
        const data = await productRepository.getProduct(productId);
        response.json(data);
    }
    catch (error) {
        console.error("Error:", error);
        response.status(500).send("Internal server error");
    }
});
productRouter.get('/category/:category/number', async (request, response) => {
    try {
        const category = request.params.category;
        const data = await productRepository.getNumberOfProducts(category);
        response.json(data);
    }
    catch (error) {
        console.error("Error:", error);
        response.status(500).send("Internal server error");
    }
});
export default productRouter;
