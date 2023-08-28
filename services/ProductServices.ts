import {IProduct} from "../model/Product.js";
import {Model} from "mongoose";
import {Service} from "./Service.js";

export class ProductServices extends Service<IProduct> {
    constructor(productModel: Model<IProduct>) {
        super(productModel);
    }

    /**
     * Finds all products
     * @returns {Promise<IProduct[]>}
     */
    public findAll = async (): Promise<IProduct[]> => {
        return this.model.find({}).then((data) => {
            return data;
        });
    }

    /**
     * Finds products with limit and skip
     * @param limit
     * @param skip
     * @param category
     * @returns {Promise<IProduct[]>}
     */
    public async findWithLimitAndSkip(limit: number, skip: number = 0, category?: string): Promise<IProduct[]> {
        if (category) {
            if (limit) {
                return this.model.find({category: category})
                    .skip(skip)
                    .limit(limit)
                    .then((data) => {
                        return data;
                    });
            } else {
                return this.model.find({category: category}).skip(skip).then((data) => {
                    return data;
                });
            }
        } else {
            if (limit) {
                return this.model.find({}).skip(skip).limit(limit).then((data) => {
                    return data;
                });
            } else {
                return this.model.find({}).skip(skip).then((data) => {
                    return data;
                });
            }
        }
    }

    /**
     * Finds products by category
     * @param category
     * @returns {Promise<IProduct[]>}
     */
    public async findByCategory(category: string): Promise<IProduct[]> {
        return this.model.find({category: category}).then((data) => {
            return data;
        });
    }

    /**
     * Finds products by title, limit and skip
     * @param title
     * @param limit
     * @param skip
     * @returns {Promise<IProduct[]>}
     */
    public async findByTitle(title: string, limit: number, skip: number = 0): Promise<IProduct[]> {
        if (limit) {
            return this.model.find({title: new RegExp(title, "i")}).limit(limit).skip(skip).then((data) => {
                return data;
            });
        } else return this.model.find({title: new RegExp(title, "i")}).then((data) => {
            return data;
        });
    }

    /**
     * Finds product with given id
     * @param productId
     * @returns {Promise<IProduct | null>}
     */
    public async getProduct(productId: string) {
        return this.model.findOne({id: productId}).then((data) => {
            return data;
        });
    }

    /**
     * Gets the number of products with given title
     * @param title
     * @returns {Promise<number>}
     */
    public async getNumberOfProductsTitle(title: string) {
        return this.model.countDocuments({title: new RegExp(title, "i")}).then((data) => {
            return data;
        });
    }

    /**
     * Gets the number of products with given category
     * @param category
     * @returns {Promise<number>}
     */
    public async getNumberOfProducts(category? : string){
        if(category){
            return this.model.countDocuments({category: category}).then((data)=>{
                return data;
            });
        }
        else{
            return this.model.countDocuments({}).then((data)=>{
                return data;
            });
        }
    }



}