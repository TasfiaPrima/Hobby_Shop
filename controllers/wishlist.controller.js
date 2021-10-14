const Wishlist = require('../models/Wishlist.model');
const Products = require('../models/Products.model');

const getWishlistProducts = async (req,res) => {
    const userId = req.params.userId;
    try{
        let wishlist = await Wishlist.find({userId});
        if(wishlist){
            return res.status(200).json({ success:true, message:'Wishlist found',wishlist });
        }
        else{
            return res.status(504).json({success: false, message:'finding Wishlist failed'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

const addWishlistProducts = async (req,res) => {
    const userId = req.params.userId;
    const {products} = req.body;

    try{
        let wishlist = await Wishlist.findOne({userId});
        let actualProduct = await Products.findOne({_id: products.productId});
        if(!actualProduct){
            res.status(404).send('products not found!')
        }
        const id=products.productId
        const quantity=products.quantity
        const name = actualProduct.productName;
        try{
            const newWishlist = await Wishlist.create({
                userId,
                products: { productId:id, name, quantity },
            });
            return res.status(201).send(newWishlist);
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

const deleteWishlistProducts = async (req,res) => {
    const wishlistId = req.params.WishlistId;
    try{
        let wishlist = await Wishlist.findByIdAndRemove(wishlistId)
        return res.status(200).json({ success:true, message:'Wishlist deleted' });

    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}


module.exports={addWishlistProducts,getWishlistProducts,deleteWishlistProducts};