import { Service } from "./Service.js";
export class OrderServices extends Service {
    constructor(model) {
        super(model);
    }
    async saveOrder(order) {
        return this.model.create(order).then((result) => {
            return result;
        });
    }
    async findOrderById(orderId) {
        return this.model.findOne({ _id: orderId }).then((result) => {
            return result;
        });
    }
    async findOrdersByUserId(userId) {
        return this.model.find({ userId: userId }).then((result) => {
            return result;
        });
    }
}
