import { Service } from "./Service.js";
import { v4 } from "uuid";
export class UserServices extends Service {
    constructor(model) {
        super(model);
    }
    async login(email, password) {
        let foundUser = await this.model.findOne({ email: email, password: password });
        if (foundUser) {
            foundUser.token = v4();
            await foundUser.save();
            return foundUser;
        }
    }
    async saveUser(user) {
        return this.model.create(user).then((result) => {
            return result;
        });
    }
    async updateCartIdForUser(cartId, userId) {
        return this.model.updateOne({ _id: userId }, { cartId: cartId }).then((result) => {
            return result;
        });
    }
    async findUserFromToken(token) {
        return this.model.findOne({ token: token }).then((result) => {
            return result;
        });
    }
}
