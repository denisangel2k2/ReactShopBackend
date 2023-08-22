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
                return cart;
            }
        });
    }
    async updateCart(product, cartId, userId) {
        const foundCart = await this.model.findOne({ _id: cartId, "products.id": product.id });
        if (foundCart) {
            await this.model.updateOne({ _id: cartId, "products.id": product.id, "userId": userId }, { $inc: { "products.$.quantity": product.quantity } });
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
}
