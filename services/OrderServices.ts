import {Service} from "./Service.js";
import {IOrder} from "../model/Order.js";
import {Model} from "mongoose";

export class OrderServices extends Service<IOrder> {
    constructor(model: Model<IOrder>) {
        super(model);
    }

    /**
     * Save a order to the database
     * @param order
     * @returns saved order
     */
    public async saveOrder(order: IOrder) {
        return this.model.create(order).then((result) => {
            return result;
        });
    }

    /**
     * Finds order by id
     * @param orderId
     * @returns {Promise<IOrder | null>}
     */
    public async findOrderById(orderId: string): Promise<IOrder | null> {
        return this.model.findOne({_id: orderId}).then((result) => {
            return result;
        });
    }

    /**
     * Finds orders by userId
     * @param userId
     * @returns {Promise<IOrder[]>}
     */
    public async findOrdersByUserId(userId: string): Promise<IOrder[]> {
        return this.model.find({userId: userId}).then((result)=>{
            return result;
        });
    }


}