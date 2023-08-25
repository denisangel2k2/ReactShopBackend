import { Service } from "./Service.js";
export class CartServices extends Service {
    constructor(model) {
        super(model);
    }
    async saveCart(cart) {
        return this.model.create(cart).then((result) => {
            return result;
        });
    }
    async updateCartExtraAttributes(cartId) {
        return this.model.findOne({ _id: cartId }).then((cart) => {
            if (cart) {
                cart.total = 0;
                cart.totalQuantity = 0;
                cart.discountTotal = 0;
                cart.products.forEach((product) => {
                    cart.total += product.price * product.quantity;
                    cart.totalQuantity += product.quantity;
                    cart.discountTotal += product.discountedPrice * product.quantity;
                });
                cart.totalProducts = cart.products.length;
                cart.save();
                return {
                    userId: cart.userId,
                    total: cart.total,
                    totalQuantity: cart.totalQuantity,
                    discountTotal: cart.discountTotal,
                    totalProducts: cart.totalProducts,
                    products: cart.products.map((product) => {
                        return {
                            id: product.id,
                            title: product.title,
                            description: product.description,
                            price: product.price,
                            discountedPercentage: product.discountedPercentage,
                            rating: product.rating,
                            stock: product.stock,
                            thumbnail: product.thumbnail,
                            quantity: product.quantity,
                            total: product.total,
                            discountedPrice: product.discountedPrice
                        };
                    })
                };
            }
        });
    }
    async updateCart(product, cartId, userId) {
        const foundCart = await this.model.findOne({ _id: cartId, "products.id": product.id });
        if (foundCart) {
            await this.model.updateOne({
                _id: cartId,
                "products.id": product.id,
                "userId": userId
            }, { $inc: { "products.$.quantity": product.quantity } });
        }
        else {
            await this.model.updateOne({ _id: cartId, "userId": userId }, { $push: { products: product } });
        }
        return this.updateCartExtraAttributes(cartId);
    }
    async deleteProductFromCart(productId, cartId, userId) {
        await this.model.updateOne({ _id: cartId, "userId": userId }, { $pull: { products: { id: productId } } });
        return this.updateCartExtraAttributes(cartId);
    }
    async getCartUserId(cartId) {
        return this.model.findOne({ _id: cartId }).then((result) => {
            if (result)
                return result.userId;
            else
                return null;
        });
    }
    async findByUserId(userId) {
        return this.model.findOne({ userId: userId }).then((result) => {
            if (result) {
                return result;
            }
            else
                return null;
        });
    }
    async deleteAllProductsFromCart(cartId) {
        await this.model.updateOne({ _id: cartId }, { products: [] });
        return this.updateCartExtraAttributes(cartId);
    }
    async findById(cartId) {
        return this.model.findOne({ _id: cartId }).then((result) => {
            if (result) {
                return {
                    userId: result.userId,
                    total: result.total,
                    totalQuantity: result.totalQuantity,
                    discountTotal: result.discountTotal,
                    totalProducts: result.totalProducts,
                    products: result.products.map((product) => {
                        return {
                            id: product.id,
                            title: product.title,
                            description: product.description,
                            price: product.price,
                            discountedPercentage: product.discountedPercentage,
                            rating: product.rating,
                            stock: product.stock,
                            thumbnail: product.thumbnail,
                            quantity: product.quantity,
                            total: product.total,
                            discountedPrice: product.discountedPrice
                        };
                    })
                };
            }
            else
                return null;
        });
    }
}
