const express = require("express");
const router = express.Router();
const Controller = require('../controllers/review.controller');

//router.get('/review/:userId',Controller.createProductReview);
router.post('/review',Controller.createProductReview);
//router.delete('/review/',Controller.deleteCartProducts);
//router.put('/review/',Controller.updateCartProducts);

module.exports = router;