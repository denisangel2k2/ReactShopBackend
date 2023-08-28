import {Service} from "./Service.js";
import {IUser} from "../model/User.js";
import {Model} from "mongoose";
import {v4} from "uuid";

export class UserServices extends Service<IUser>
{
    constructor(model : Model<IUser>){
        super(model);
    }

    /**
     * Login user
     * @param email - string
     * @param password - string
     * @returns {Promise<{token: string, email: string, cartId: string}>}
     */
    public async login(email: string, password: string) {
        let foundUser=await this.model.findOne({email: email, password: password});

        if(foundUser){
            foundUser.token=v4();
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
    public async saveUser(user: IUser){
        return this.model.create(user).then((result)=>{
            return result;
        });
    }

    /**
     * Update cartId for user
     * @param cartId - string
     * @param userId - string
     */
    public async updateCartIdForUser(cartId: string, userId: string){
        return this.model.updateOne({_id: userId},{cartId: cartId}).then((result)=>{
            return result;
        });
    }

    /**
     * Find user from token
     * @param token
     */
    public async findUserFromToken(token: string){
        return this.model.findOne({token: token}).then((result)=>{
            return result;
        });
    }

    /**
     * Logout user, sets the token of a user to ''
     * @param token - string
     * @returns {Promise<*>}
     */
    public async logout(token: string){
        return this.model.updateOne({token: token},{token: ''}).then((result)=>{
            return result;
        });
    };



}