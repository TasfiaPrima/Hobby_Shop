const User= require('../models/user.model');
const Orders = require('../models/Orders.model');
const Cart = require('../models/Cart.model');
const Products = require('../models/Products.model');


const getOrder = async (req,res) => {
    const userId = req.params.userId;
    let totalBill=0;
    try{
        let orders = await Orders.find({userId});
        if(orders){
            orders.forEach(oneOrder=>totalBill = totalBill + oneOrder.bill)
            return res.status(200).json({ success:true, message:'order found',orders,totalBill });
        }
        else{
            return res.status(504).json({success: false, message:'finding orders failed'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

const addOrder = async (req,res) => {
    const userId = req.params.userId;
    const {products} = req.body;

    try{
        let orders = await Orders.findOne({userId});
        let actualProduct = await Products.findOne({_id: products.productId});
        if(!actualProduct){
            res.status(404).send('products not found!')
        }
        const price = actualProduct.price;
        const id=products.productId
        const quantity=products.quantity
        const name = actualProduct.productName;

        let user
        try{
          user= await User.findById(userId);

        }catch(err){ 
            console.log(err);
            res.status(500).send("Something went wrong");
        };
        
        user.notifications.push({message:'your order has been created',seen:false});

        try{
await user.save()
        }catch(err){ 
            console.log(err);
            res.status(500).send("Something went wrong");
        };

        try{
            const newOrders = await Orders.create({
                userId,
                products: { productId:id, name, quantity },
                bill: quantity*price
            });
            return res.status(201).send(newOrders);
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

const deleteOrder = async (req,res) => {
    //const userId = req.params.userId;
    const orderId = req.params.orderId;
    try{
        let orders = await Orders.findByIdAndRemove(orderId)
        return res.status(200).json({ success:true, message:'order deleted' });

    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}


// const checkout = async (req,res) => {
//     try{
//         const userId = req.params.userId;n
//         const {source} = req.body;
//         let cart = await Cart.findOne({userId});
//         //let user = await Orders.userId.findOne({_id: userId});
//         //const email = user.email;
//         if(cart){
//             const charge = await stripe.charges.create({
//                 amount: cart.bill,
//                 currency: 'bdt',
//                 source: source,
//                 //receipt_email: email
//             })
//             if(!charge) throw Error('Payment failed');
//             if(charge){
//                 const order = await Orders.create({
//                     userId,
//                     items: cart.items,
//                     bill: cart.bill
//                 });
//                 const data = await Cart.findByIdAndDelete({_id:cart.id});
//                 return res.status(201).send(order);
//             }
//         }
//         else{
//             res.status(500).send("You do not have items in cart");
//         }
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).send("Something went wrong");
//     }
// }



module.exports={addOrder,getOrder,deleteOrder,};