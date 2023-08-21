import {Repository} from "./Repository";
import {ICart} from "../model/Cart";
import {Model} from "mongoose";

export class CartRepo extends Repository<ICart>{
    constructor(model:Model<ICart>){
        super(model);
    }

}