const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  productName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  },
  available: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  review: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Review',
  },
},
{
    timestamps: true,
});


const Products = mongoose.model("Products", ProductSchema);
module.exports = Products;

