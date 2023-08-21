import {Repository} from "./Repository.js";
import {ICart} from "../model/Cart.js";
import {Model} from "mongoose";

export class CartRepo extends Repository<ICart>{
    constructor(model:Model<ICart>){
        super(model);
    }

    public async saveCart(cart : ICart) : Promise<ICart>{
        return this.model.create(cart).then((result)=>{
            return result;
        });

    }

}