import {Repository} from "./Repository.js";
import {IUser} from "../model/User";
import {Model} from "mongoose";

export class UserRepo extends Repository<IUser>
{
    constructor(model : Model<IUser>){
        super(model);
    }

    public async findByEmailAndPassword(email: string, password: string) {
        return this.model.find({email: email, password: password},{token: "$_id", _id: 0}).then((result)=>{
            return result;
        });
    }

    public async saveUser(user: IUser){
        return this.model.create(user).then((result)=>{
            return result;
        });
    }

}