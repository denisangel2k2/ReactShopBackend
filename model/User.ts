import {model, Schema} from "mongoose";

export interface IUser extends IEntity{
    token: string,
    email: string,
    password: string,
    cartId: string
}

const userSchema= new Schema<IUser>({
    token: String,
    email: String,
    password: String,
    cartId: String
});
const UserModel = model("users",userSchema);
export default UserModel;