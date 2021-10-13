const Cart = require('../models/Cart.model');
const Products = require('../models/Products.model');

const getCartProducts = async (req,res) => {
    const userId = req.params.userId;
    let totalBill=0;
    try{
        let cart = await Cart.find({userId});
        if(cart){
            cart.forEach(oneCart=>totalBill = totalBill + oneCart.bill)
            return res.status(200).json({ success:true, message:'cart found',cart,totalBill });
        }
        else{
            return res.status(504).json({success: false, message:'finding cart failed'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

const addCartProducts = async (req,res) => {
    const userId = req.params.userId;
    const {products} = req.body;

    try{
        let cart = await Cart.findOne({userId});
        let actualProduct = await Products.findOne({_id: products.productId});
        if(!actualProduct){
            res.status(404).send('products not found!')
        }
        const price = actualProduct.price;
        const id=products.productId
        const quantity=products.quantity
        const name = actualProduct.productName;
        try{
            const newCart = await Cart.create({
                userId,
                products: { productId:id, name, quantity },
                bill: quantity*price
            });
            return res.status(201).send(newCart);
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

const deleteCartProducts = async (req,res) => {
    //const userId = req.params.userId;
    const cartId = req.params.cartId;
    try{
        let cart = await Cart.findByIdAndRemove(cartId)
        return res.status(200).json({ success:true, message:'cart deleted' });

    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

const updateCartProducts= async(req,res)=>{
    const cartId = req.params.cartId;
    const quantity= req.body.quantity;
    try{
let cart = await Cart.findById(cartId)
let actualProduct = await Products.findById(cart.products.productId);
const price = actualProduct.price;
cart.products.quantity=quantity;
cart.bill=quantity*price;
await cart.save()
return res.status(200).json({ success:true, message:'cart updated',cart });

    }catch(err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }


}

module.exports={addCartProducts,getCartProducts,deleteCartProducts,updateCartProducts};