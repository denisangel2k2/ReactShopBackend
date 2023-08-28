import { Service } from "./Service.js";
export class CartServices extends Service {
    constructor(model) {
        super(model);
    }
    /**
     * Save a cart to the database
     * @param cart<ICart> - cart to save
     * @returns saved cart<ICart>
     */
    async saveCart(cart) {
        return this.model.create(cart).then((result) => {
            return result;
        });
    }
    /**
     * Update the extra attributes of a cart, such as total, totalQuantity, discountTotal, totalProducts
     * @param cartId - string
     * @returns updated cart - ICart
     */
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
    /**
     * Update a cart with a product and update the quantity based on the attributes of the given product
     * @param product - ICartProduct
     * @param cartId - string
     * @param userId - string
     * @returns updated cart - ICart
     */
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
    /**
     * Delete a product from a cart
     * @param productId - string
     * @param cartId - string
     * @param userId - string
     * @returns updated cart - ICart
     */
    async deleteProductFromCart(productId, cartId, userId) {
        await this.model.updateOne({ _id: cartId, "userId": userId }, { $pull: { products: { id: productId } } });
        return this.updateCartExtraAttributes(cartId);
    }
    /**
     * Get the user id of a cart
     * @param cartId - id of the cart
     * @returns user id of the cart
     * @returns null if cart not found
     */
    async getCartUserId(cartId) {
        return this.model.findOne({ _id: cartId }).then((result) => {
            if (result)
                return result.userId;
            else
                return null;
        });
    }
    /**
     * Find a cart by user id
     * @param userId - string -  id of the user
     * @returns cart - ICart
     * @returns null if cart not found
     */
    async findByUserId(userId) {
        return this.model.findOne({ userId: userId }).then((result) => {
            if (result) {
                return result;
            }
            else
                return null;
        });
    }
    /**
     * Delete all products from a cart
     * @param cartId - string
     * @returns updated cart - ICart
     */
    async deleteAllProductsFromCart(cartId) {
        await this.model.updateOne({ _id: cartId }, { products: [] });
        return this.updateCartExtraAttributes(cartId);
    }
    /**
     * Find a cart by id
     * @param cartId - string
     * @returns cart - contains cart attributes without _id
     */
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
