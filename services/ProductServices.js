import { Service } from "./Service.js";
export class ProductServices extends Service {
    constructor(productModel) {
        super(productModel);
    }
    /**
     * Finds all products
     * @returns {Promise<IProduct[]>}
     */
    findAll = async () => {
        return this.model.find({}).then((data) => {
            return data;
        });
    };
    /**
     * Finds products with limit and skip
     * @param limit
     * @param skip
     * @param category
     * @returns {Promise<IProduct[]>}
     */
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
    /**
     * Finds products by category
     * @param category
     * @returns {Promise<IProduct[]>}
     */
    async findByCategory(category) {
        return this.model.find({ category: category }).then((data) => {
            return data;
        });
    }
    /**
     * Finds products by title, limit and skip
     * @param title
     * @param limit
     * @param skip
     * @returns {Promise<IProduct[]>}
     */
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
    /**
     * Finds product with given id
     * @param productId
     * @returns {Promise<IProduct | null>}
     */
    async getProduct(productId) {
        return this.model.findOne({ id: productId }).then((data) => {
            return data;
        });
    }
    /**
     * Gets the number of products with given title
     * @param title
     * @returns {Promise<number>}
     */
    async getNumberOfProductsTitle(title) {
        return this.model.countDocuments({ title: new RegExp(title, "i") }).then((data) => {
            return data;
        });
    }
    /**
     * Gets the number of products with given category
     * @param category
     * @returns {Promise<number>}
     */
    async getNumberOfProducts(category) {
        if (category) {
            return this.model.countDocuments({ category: category }).then((data) => {
                return data;
            });
        }
        else {
            return this.model.countDocuments({}).then((data) => {
                return data;
            });
        }
    }
}
