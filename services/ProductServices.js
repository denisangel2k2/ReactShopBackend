import { Service } from "./Service.js";
export class ProductServices extends Service {
    constructor(productModel) {
        super(productModel);
    }
    findAll = async () => {
        return this.model.find({}).then((data) => {
            return data;
        });
    };
    async findWithLimitAndSkip(limit, skip = 0, category) {
        if (category) {
            if (limit) {
                return this.model.find({ category: category })
                    .skip(skip)
                    .limit(limit)
                    .then((data) => {
                    return data;
                });
            }
            else {
                return this.model.find({ category: category }).skip(skip).then((data) => {
                    return data;
                });
            }
        }
        else {
            if (limit) {
                return this.model.find({}).skip(skip).limit(limit).then((data) => {
                    return data;
                });
            }
            else {
                return this.model.find({}).skip(skip).then((data) => {
                    return data;
                });
            }
        }
    }
    async findByCategory(category) {
        return this.model.find({ category: category }).then((data) => {
            return data;
        });
    }
    async findByTitle(title, limit, skip = 0) {
        if (limit) {
            return this.model.find({ title: new RegExp(title, "i") }).limit(limit).skip(skip).then((data) => {
                return data;
            });
        }
        else
            return this.model.find({ title: new RegExp(title, "i") }).then((data) => {
                return data;
            });
    }
    async getProduct(productId) {
        return this.model.findOne({ id: productId }).then((data) => {
            return data;
        });
    }
}
