require("dotenv").config();
const express = require("express");
const app = express();
const authRoutes = require("./routes/user.auth.routes");
const productsRoutes = require("./routes/products.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/orders.routes");
const reviewRoutes = require("./routes/review.routes");
const wishlistRoutes = require("./routes/wishlist.routes");


const mongoose = require("mongoose");
require("dotenv").config();

//Connect to Database:
mongoose
  .connect(process.env.MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch((error) => {
    console.log("Error");
  });

// for parsing application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use(authRoutes);
app.use(productsRoutes);
app.use(cartRoutes);
app.use(orderRoutes);
app.use(reviewRoutes);
app.use(wishlistRoutes);

module.exports = app;
