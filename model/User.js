import { model, Schema } from "mongoose";
const userSchema = new Schema({
    token: String,
    email: String,
    password: String,
    cartId: String
});
const UserModel = model("users", userSchema);
export default UserModel;
