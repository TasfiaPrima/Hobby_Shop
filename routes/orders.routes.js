const express = require("express");
const router = express.Router();
const orderController = require('../controllers/orders.controller');


router.get('/order/:userId',orderController.getOrder);
router.post('/order/:userId',orderController.addOrder);
router.delete('/order/:orderId',orderController.deleteOrder);

//router.post('/orders/:userId',orderController.checkout);



module.exports = router;