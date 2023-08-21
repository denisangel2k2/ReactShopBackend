import {IProduct} from "../model/Product.js";
import {Model} from "mongoose";
import {Repository} from "./Repository.js";

export class ProductRepo extends Repository<IProduct> {
    constructor(productModel: Model<IProduct>) {
        super(productModel);
    }

    public findAll = async (): Promise<IProduct[]> => {
        return this.model.find({}).then((data) => {
            return data;
        });
    }

    public async findWithLimitAndSkip(limit: number, skip: number = 0, category?: string): Promise<IProduct[]> {
        if (category) {
            if (limit) {
                return this.model.find({category: category}).skip(skip).limit(limit).then((data) => {
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

    public async findByCategory(category: string): Promise<IProduct[]> {
        return this.model.find({category: category}).then((data) => {
            return data;
        });
    }

    public async findByTitle(title: string, limit: number, skip: number=0): Promise<IProduct[]> {
        if (limit){
            return this.model.find({title: new RegExp(title, "i")}).limit(limit).skip(skip).then((data) => {
                return data;
            });
        }
        else return this.model.find({title: new RegExp(title, "i")}).then((data) => {
            return data;
        });
    }
    public async getProduct(productId: number){
        return this.model.find({productId: productId}).then((data) => {
            return data;
        });
    }


}