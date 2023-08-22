import express from "express";
import { ProductServices } from "../services/ProductServices.js";
import ProductModel from "../model/Product.js";
const productRepository = new ProductServices(ProductModel);
const productRouter = express.Router();
productRouter.get('/', (request, response) => {
    if (request.query.limit || request.query.skip) {
        productRepository.findWithLimitAndSkip(Number(request.query.limit), Number(request.query.skip)).then((data) => {
            response.json(data);
        });
    }
    else {
        productRepository.findAll().then((data) => {
            response.json(data);
        });
    }
});
productRouter.get('/category/:category', (request, response) => {
    if (request.query.limit || request.query.skip) {
        productRepository.findWithLimitAndSkip(Number(request.query.limit), Number(request.query.skip), request.params.category).then((data) => {
            response.json(data);
        });
    }
    else {
        productRepository.findByCategory(request.params.category).then((data) => {
            response.json(data);
        });
    }
});
productRouter.get('/title/:title', (request, response) => {
    if (request.query.limit || request.query.skip) {
        productRepository.findByTitle(request.params.title, Number(request.query.limit), Number(request.query.skip)).then((data) => {
            response.json(data);
        });
    }
});
export default productRouter;
