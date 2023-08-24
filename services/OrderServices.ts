import {Service} from "./Service.js";
import {IOrder} from "../model/Order.js";
import {Model} from "mongoose";

export class OrderServices extends Service<IOrder> {
    constructor(model: Model<IOrder>) {
        super(model);
    }

    public async saveOrder(order: IOrder) {
        return this.model.create(order).then((result) => {
            return result;
        });
    }

    public async findOrderById(orderId: string) {
        return this.model.findOne({_id: orderId}).then((result) => {
            return result;
        });
    }
    public async findOrdersByUserId(userId: string) {
        return this.model.find({userId: userId}).then((result)=>{
            return result;
        });
    }


}