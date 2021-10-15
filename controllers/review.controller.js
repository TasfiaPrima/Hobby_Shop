const Review = require('../models/Review.model');
const Products = require('../models/Products.model');


const createProductReview = async (req, res) => {
    const {rating,comment,productId,userId} = req.body;

    try{
        let review = await Review.findOne({userId});
        let actualProduct = await Products.findOne({_id: productId});
        if(!actualProduct){
            res.status(404).send('product not found!')
        }
        try{
            const newReview = await Review.create({
                rating,
                comment,
                userId,
                productId,
            });

            return res.status(201).send(newReview);
        }catch(err){ 
            console.log(err);
            res.status(500).send("Something went wrong");
        }
        
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
  }

  module.exports = {createProductReview};