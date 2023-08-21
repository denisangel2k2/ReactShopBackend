import { Repository } from "./Repository.js";
export class UserRepo extends Repository {
    constructor(model) {
        super(model);
    }
    async findByEmailAndPassword(email, password) {
        return this.model.find({ email: email, password: password }, { token: "$_id", _id: 0 }).then((result) => {
            return result;
        });
    }
    async saveUser(user) {
        return this.model.create(user).then((result) => {
            return result;
        });
    }
}
