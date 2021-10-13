const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Products',
      },
  },
  {
    timestamps: true,
  }
)
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
