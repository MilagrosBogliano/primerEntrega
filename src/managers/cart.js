const {createSecretKey} = require('crypto');
const fs = require('fs');
const {parse} = require('path');
const ProductsManager = require('./products');
const cartPath = __dirname + './../files/cart.json'
const productsPath = __dirname + './../files/products.json'

const showError = (error) => {
    return {
        status: "error",
        error: error
    }
}
class CartManager {
    createCart = async (cart) => {
        if (fs.existsSync(cartPath)) {
            try {
                console.log("entra en el trycat")
                const getCarts = await fs.promises.readFile(cartPath, 'utf-8');
                const carts = JSON.parse(getCarts);
                console.log(carts.length)
                if (carts.legnth === 0) {
                    cart.id = 1;
                    carts.push(cart);
                    await fs.promises.writeFile(cartPath, JSON.stringify(carts, null, 2));
                    return {
                        status: "success",
                        msg: "1st cart created"
                    }
                }
                cart.id = carts[carts.length - 1].id + 1;
                carts.push(cart);
                await fs.promises.writeFile(cartPath, JSON.stringify(carts, null, 2));
                return {
                    status: "success",
                    msg: "Cart added"
                }
            } catch (error) {
                showError(error);
            }
        } else {
            try {
                cart.id = 1;
                await fs.promises.writeFile(cartPath, JSON.stringify([cart], null, 2));
                return {
                    status: "success",
                    msg: "Array Created!"
                }
            } catch (error) {
                showError(error);
            }
        }
    }
    getAll = async () => {
        if (fs.existsSync(cartPath)) {
            const getCart = await fs.promises.readFile(cartPath, 'utf-8');
            const cart = JSON.parse(getCart);
            return {
                status: "succes",
                payload: cart
            }
        }
        return {
            status: "error",
            msg: "Your cart is empty!"
        }
    }
    deleteCart = () => {
        if (fs.existsSync(pathToUsers)) {
            fs.unlinkSync(pathToUsers)
            return {
                status: "success",
                msg: "Cart cleared!"
            }
        }
        return {
            status: "error",
            msg: "Your cart is empty!"
        }
    }
    deleteOneProduct = async (id) => {
        if (isNaN(id)) return {
            status: "error",
            error: "ID must be a number"
        }
        const getCarts = await fs.promises.readFile(cartPath, 'utf-8');
        const carts = JSON.parse(getCarts);
        const newCartList = carts.filter(cart => cart.id !== parseInt(id));
        await fs.promises.writeFile(cartPath, JSON.stringify(newCartList, null, 2));
        return {
            status: "success",
            msg: "Cart deleted"
        }
    }
    getProductsInCart = async (id) => {
        const getCarts = await fs.promises.readFile(cartPath, 'utf-8');
        const carts = JSON.parse(getCarts);
        const cartFound = carts.find(cart => cart.id === parseInt(id));
        return {
            status: "success",
            Item: cartFound.products
        }
    }
    addProductToCart = async (cart_id, product_id) => {
        const getCarts = await fs.promises.readFile(cartPath, 'utf-8');
        const carts = JSON.parse(getCarts);
        const getProducts = await fs.promises.readFile(productsPath, 'utf-8');
        const products = JSON.parse(getProducts);
        const cartFound = carts.find(cart => cart.id === parseInt(cart_id));
        const productFound = products.find(prod => prod.id === parseInt(product_id));
        cartFound.products.push(productFound.id);
        await fs.promises.writeFile(cartPath, JSON.stringify(carts, null, 2))
        return {
            status: "success",
            msg: `${productFound.name} added to cart number °${cartFound.id}`
        }
    }
    deleteProductFromCart = async (cart_id, product_id) => {
        const getCarts = await fs.promises.readFile(cartPath, 'utf-8');
        const carts = JSON.parse(getCarts);
        const cartFound = carts.find(cart => cart.id === parseInt(cart_id));
        const productList = cartFound.products
        const filteredProductList = productList.filter(num => num !== parseInt(product_id));
        cartFound.products = filteredProductList;
        await fs.promises.writeFile(cartPath, JSON.stringify(carts, null, 2))
        return {
            status: "success",
            msg: `Item removed from cart number °${cartFound.id}`
        }
    }
}

module.exports = CartManager;