import {Service} from "./Service.js";
import {IUser} from "../model/User.js";
import {Model} from "mongoose";
import {v4} from "uuid";

export class UserServices extends Service<IUser>
{
    constructor(model : Model<IUser>){
        super(model);
    }

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

    public async saveUser(user: IUser){
        return this.model.create(user).then((result)=>{
            return result;
        });
    }
    public async updateCartIdForUser(cartId: string, userId: string){
        return this.model.updateOne({_id: userId},{cartId: cartId}).then((result)=>{
            return result;
        });
    }
    public async findUserFromToken(token: string){
        return this.model.findOne({token: token}).then((result)=>{
            return result;
        });
    }



}