import {model, Schema} from "mongoose";

export interface IUser extends IEntity{
    email: string,
    password: string,
}

const userSchema= new Schema<IUser>({
    email: String,
    password: String,
});
const userModel = model("users",userSchema);
export default userModel;