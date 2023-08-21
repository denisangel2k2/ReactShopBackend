import { Repository } from "./Repository.js";
export class CartRepo extends Repository {
    constructor(model) {
        super(model);
    }
    async saveCart(cart) {
        return this.model.create(cart).then((result) => {
            return result;
        });
    }
}
