const express = require('express');
const momentjs = require('moment');
const moment = momentjs();
const router = express.Router();
const CartManager = require('../managers/cart');

const cartService = new CartManager();

router.get('/', (req, res) => {
    cartService.getAll().then(cart => res.send(cart));
})

router.delete('/:id', (req, res) => {
    const req_id = req.params['id'];
    cartService.deleteOneProduct(req_id).then(cart => res.send(cart))
})

router.post('/', (req, res) => {
    const body = {
        timestamp: moment.format('DD/MM/YYYY hh:mm:ss a'),
        products: [],
    }
    cartService.createCart(body).then(cart=>res.send(cart))
})

router.get('/:id/products', (req, res) => {
    const cart_id= req.params['id'];
    cartService.getProductsInCart(cart_id).then(cart=>res.send(cart));
})

router.post('/:id/products/:id_prod',(req,res)=>{
    const cart_id = req.params['id'];
    const prod_id = req.params['id_prod'];
    cartService.addProductToCart(cart_id,prod_id).then(result=>res.send(result));
})

router.delete('/:id/products/:id_prod',(req,res)=>{
    const cart_id = req.params['id'];
    const prod_id = req.params['id_prod'];
    cartService.deleteProductFromCart(cart_id,prod_id).then(result=>res.send(result));
})
module.exports = router;