const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products:{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products"
        },
        name: {type: String},
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.'],
            default: 1
        },
    },

    bill: {
        type: Number,
        required: true,
        default: 0
    }
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;