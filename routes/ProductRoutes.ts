import express from "express";
import { ProductRepo } from "../repository/ProductRepo.js";
import ProductModel from "../model/Product.js";
import bodyParser from "body-parser";


const productRepository = new ProductRepo(ProductModel);

const productRouter = express.Router();
productRouter.get('/products',(request,response)=>{
    if (request.query.limit || request.query.skip){
        productRepository.findWithLimitAndSkip(Number(request.query.limit),Number(request.query.skip)).then((data)=>{
            response.json(data);
        });
    }
    else{
        productRepository.findAll().then((data)=>{
            response.json(data);
        });
    }
});

productRouter.get('/products/category/:category',(request,response)=>{

    if (request.query.limit || request.query.skip){

        productRepository.findWithLimitAndSkip(Number(request.query.limit),Number(request.query.skip),request.params.category).then((data)=>{
            response.json(data);
        });
    }
    else{
        productRepository.findByCategory(request.params.category).then((data)=>{
            response.json(data);
        });
    }

});
productRouter.get('/products/title/:title',(request,response)=>{
    if (request.query.limit || request.query.skip){
        productRepository.findByTitle(request.params.title,Number(request.query.limit),Number(request.query.skip)).then((data)=>{
            response.json(data);
        });
    }
});
export default productRouter;