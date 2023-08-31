import express from "express";
import {ProductServices} from "../services/ProductServices.js";
import ProductModel from "../model/Product.js";
import bodyParser from "body-parser";


const productServices = new ProductServices(ProductModel);

const productRouter = express.Router();

/**
 * Route that finds all products
 * @route GET /products
 */
productRouter.get('/', async (request, response) => {
    try {
        const limit = Number(request.query.limit);
        const skip = Number(request.query.skip);

        if (limit < 1 || skip < 0) {
            return response.status(400).send("Bad request");
        }

        let data;

        if (request.query.limit || request.query.skip) {
            data = await productServices.findWithLimitAndSkip(limit, skip);
        } else {
            data = await productServices.findAll();
        }

        response.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        response.status(200).json(data);
    } catch (error) {
        console.error("Error:", error);
        response.status(500).send("Internal server error");
    }
});
/**
 * Route that finds all products in a category
 * @route GET /products/category/{category}
 * @param {string} category.path.required - category of the product
 * @param {number} limit.query - limit of products to return
 * @param {number} skip.query - number of products to skip
 * @returns {Array.<IProduct>} 200 - An array of products
 * @returns {Error}  default - Unexpected error
 */
productRouter.get('/category/:category', async (request, response) => {
    try {
        const limit = Number(request.query.limit);
        const skip = Number(request.query.skip);

        if ((isNaN(limit) && isNaN(skip)) || limit < 1 || skip < 0) {
            return response.status(400).send("Bad request");
        }

        let data;

        if (request.query.limit || request.query.skip) {
            data = await productServices.findWithLimitAndSkip(limit, skip, request.params.category);
        } else {
            data = await productServices.findByCategory(request.params.category);
        }

        response.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        response.status(200).json(data);
    } catch (error) {
        console.error("Error:", error);
        response.status(500).send("Internal server error");
    }
});
/**
 * Route that finds the number of all products with a matching title
 * @route GET /products/title/{title}/number
 * @param {string} title.path.required - title of the product
 * @returns {number} 200 - The number of products with a matching title
 * @returns {Error}  default - Unexpected error
 */
productRouter.get('/title/:title/number', async (request, response) => {
    try {
        const data = await productServices.getNumberOfProductsTitle(request.params.title);
        response.json(data);
    } catch (error) {
        console.error("Error:", error);
        response.status(500).send("Internal server error");
    }
});
/**
 * Route that finds all products with a matching title
 * @route GET /products/title/{title}
 * @param {string} title.path.required - title of the product
 * @param {number} limit.query - limit of products to return
 * @param {number} skip.query - number of products to skip
 * @returns {Array.<IProduct>} 200 - An array of products
 * @returns {Error}  default - Unexpected error
 */
productRouter.get('/title/:title', async (request, response) => {
    try {
        const limit = Number(request.query.limit);
        const skip = Number(request.query.skip);

        if (limit < 1 || skip < 0) {
            return response.status(400).send("Bad request");
        }
        let data;
        if (isNaN(limit) && isNaN(skip))
            data = await productServices.findByTitle(request.params.title, 0);
        else
            data = await productServices.findByTitle(request.params.title, limit, skip);
        response.json(data);
    } catch (error) {
        console.error("Error:", error);
        response.status(500).send("Internal server error");
    }
});
/**
 * Route that finds the number of all products
 * @route GET /products/number
 * @returns {number} 200 - The number of products
 * @returns {Error}  default - Unexpected error
 */
productRouter.get('/number', async (request, response) => {
    try {
        const data = await productServices.getNumberOfProducts('');
        response.json(data);
    } catch (error) {
        console.log("Error:", error);
        response.status(500).send("Internal server error!!!!");
    }
});
/**
 * Route that finds a product with a matching id
 * @route GET /products/{productId}
 * @param {string} productId.path.required - id of the product
 * @returns {IProduct} 200 - A product
 * @returns {Error}  default - Unexpected error
 */
productRouter.get('/:productId', async (request, response) => {
    try {
        const productId = request.params.productId;
        const data = await productServices.getProduct(productId);
        response.json(data);
    } catch (error) {
        console.error("Error:", error);
        response.status(500).send("Internal server error");
    }
});
/**
 * Route that finds the number of all products in a category
 * @route GET /products/category/{category}/number
 * @param {string} category.path.required - category of the product
 * @returns {number} 200 - The number of products in a category
 * @returns {Error}  default - Unexpected error
 */
productRouter.get('/category/:category/number', async (request, response) => {
    try {
        const category = request.params.category;
        const data = await productServices.getNumberOfProducts(category);
        response.json(data);
    } catch (error) {
        console.error("Error:", error);
        response.status(500).send("Internal server error");
    }
});
productRouter.get('/random',async (request,response)=>{

});
export default productRouter;