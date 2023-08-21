import { model, Schema } from "mongoose";
const userSchema = new Schema({
    email: String,
    password: String,
});
const userModel = model("users", userSchema);
export default userModel;
