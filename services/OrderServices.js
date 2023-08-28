import { Service } from "./Service.js";
export class OrderServices extends Service {
    constructor(model) {
        super(model);
    }
    /**
     * Save a order to the database
     * @param order
     * @returns saved order
     */
    async saveOrder(order) {
        return this.model.create(order).then((result) => {
            return result;
        });
    }
    /**
     * Finds order by id
     * @param orderId
     * @returns {Promise<IOrder | null>}
     */
    async findOrderById(orderId) {
        return this.model.findOne({ _id: orderId }).then((result) => {
            return result;
        });
    }
    /**
     * Finds orders by userId
     * @param userId
     * @returns {Promise<IOrder[]>}
     */
    async findOrdersByUserId(userId) {
        return this.model.find({ userId: userId }).then((result) => {
            return result;
        });
    }
}
