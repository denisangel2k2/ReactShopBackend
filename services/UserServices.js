import { Service } from "./Service.js";
import { v4 } from "uuid";
export class UserServices extends Service {
    constructor(model) {
        super(model);
    }
    /**
     * Login user
     * @param email - string
     * @param password - string
     * @returns {Promise<{token: string, email: string, cartId: string}>}
     */
    async login(email, password) {
        let foundUser = await this.model.findOne({ email: email, password: password });
        if (foundUser) {
            foundUser.token = v4();
            await foundUser.save();
            return {
                token: foundUser.token,
                email: foundUser.email,
                cartId: foundUser.cartId
            };
        }
    }
    /**
     * Register user
     * @param user - IUser
     * @returns {Promise<IUser>}
     */
    async saveUser(user) {
        return this.model.create(user).then((result) => {
            return result;
        });
    }
    /**
     * Update cartId for user
     * @param cartId - string
     * @param userId - string
     */
    async updateCartIdForUser(cartId, userId) {
        return this.model.updateOne({ _id: userId }, { cartId: cartId }).then((result) => {
            return result;
        });
    }
    /**
     * Find user from token
     * @param token
     */
    async findUserFromToken(token) {
        return this.model.findOne({ token: token }).then((result) => {
            return result;
        });
    }
    /**
     * Logout user, sets the token of a user to ''
     * @param token - string
     * @returns {Promise<*>}
     */
    async logout(token) {
        return this.model.updateOne({ token: token }, { token: '' }).then((result) => {
            return result;
        });
    }
    ;
}
