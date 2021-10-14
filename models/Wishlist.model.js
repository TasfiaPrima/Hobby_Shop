const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
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
});

const Wishlist = mongoose.model("Wishlist", WishlistSchema);
module.exports = Wishlist;