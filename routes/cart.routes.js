const express = require("express");
const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.get('/cart/:userId',cartController.getCartProducts);
router.post('/cart/:userId',cartController.addCartProducts);
router.delete('/cart/:cartId',cartController.deleteCartProducts);
router.put('/cart/:cartId',cartController.updateCartProducts);

module.exports = router;