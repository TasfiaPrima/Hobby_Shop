const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    rating: { 
      type: Number, 
      required: true,
      default: 0,
      enum: [0, 1, 2, 3, 4, 5], 
    },
    comment: { 
      type: String, 
      required: true 
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products"
},
  },
  {
    timestamps: true,
  }
)
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;