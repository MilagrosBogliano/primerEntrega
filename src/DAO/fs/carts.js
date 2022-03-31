const fs = require('fs');
const ProductsManager = require('./products');
const moment = require('moment');
const {
    parse
} = require('path');
const m = moment();
const cartPath = __dirname + '../../files/cart.json'
const productsPath = __dirname + '../../files/products.json'

const showError = (error) => {
    return {
        status: "error",
        error: error
    }
}
class CartManager {
    create = async (cart) => {
        if (fs.existsSync(cartPath)) {
            try {
                const getCarts = await fs.promises.readFile(cartPath, 'utf-8');
                const carts = JSON.parse(getCarts);
                if (carts.length === 0) {
                    cart.timestamp = m.format("hh:mm:ssA DD-MM-YYYY");
                    cart.products = [];
                    cart.id = 1;
                    carts.push(cart);
                    await fs.promises.writeFile(cartPath, JSON.stringify(carts, null, 2));
                    return {
                        status: "success",
                        msg: "1st cart created"
                    }
                }
                cart.timestamp = m.format("hh:mm:ssA DD-MM-YYYY");
                cart.products = [];
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
                cart.timestamp = m.format("hh:mm:ssA DD-MM-YYYY");
                cart.products = [];
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
    read = async () => {
        if (!fs.existsSync(cartPath)) {
            return {
                status: "error",
                error: "No DB created yet"
            }
        };
        const getCart = await fs.promises.readFile(cartPath, 'utf-8');
        const cart = JSON.parse(getCart);
        return {
            status: "succes",
            payload: cart
        }
    }
    update = async (cart_id, newCart_body) => {
        const getCarts = await fs.promises.readFile(cartPath, 'utf-8');
        const carts = JSON.parse(getCarts);
        const updatedCart = carts.map(cart => {
            if (cart.id === parseInt(cart_id)) {
                cart.id = cart_id
                return newCart_body
            }
            return cart
        })
        await fs.promises.writeFile(cartPath, JSON.stringify(updatedCart, null, 2));
        return {
            status: 'success',
            msg: 'Product updated'
        }
    }
    delete = async (id) => {
        const getCarts = await fs.promises.readFile(cartPath, 'utf-8');
        const carts = JSON.parse(getCarts);
        const newArray = carts.filter(cart => cart.id !== parseInt(id))
        await fs.promises.writeFile(cartPath, JSON.stringify(newArray, null, 2))
        return {
            status: "success",
            msg: "Product deleted"
        }
    }
    addToCart = async (cart_id, prod_id) => {
        const getProds = await fs.promises.readFile(productsPath, 'utf-8');
        const prods = JSON.parse(getProds)
        const getCarts = await fs.promises.readFile(cartPath, 'utf-8');
        const carts = JSON.parse(getCarts);
        const cartFound = carts.find(cart => cart.id === parseInt(cart_id));
        const prodFound = prods.find(prod => prod.id === parseInt(prod_id));
        cartFound.products.push(prodFound.id);
        await fs.promises.writeFile(cartPath, JSON.stringify(carts, null, 2))
        return {
            status: 'success',
            msg: `added to cart number `
        }
    }
}

module.exports = CartManager;