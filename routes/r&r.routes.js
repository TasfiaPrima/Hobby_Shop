const express = require("express");
const router = express.Router();
const Controller = require('../controllers/r&r.controller');

//router.get('/review/:userId',Controller.createProductReview);
router.post('/review/:userId',Controller.createProductReview);
//router.delete('/review/',Controller.deleteCartProducts);
//router.put('/review/',Controller.updateCartProducts);

module.exports = router;