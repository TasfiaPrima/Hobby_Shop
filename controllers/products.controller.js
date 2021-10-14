const Products = require('../models/Products.model');

const createProducts= async(req,res)=>{
    const products=new Products(req.body)
    try{
        await products.save();
    }catch(err){
        console.log(err);
        return res.status(504).json({success: false, message:'creating Products failed'});
    }
    return res.status(200).json({ success:true, message:'Products created' });
}

const getProducts= async(req,res)=>{
    let products
    try{
        products=await Products.find({});
    }catch(err){
        console.log(err);
        return res.status(504).json({success: false, message:'finding Products failed'});
    }
    return res.status(200).json({ success:true, message:'Products found',products });
}

const getAProduct= async(req,res)=>{
    let products
    try{
        products=await Products.findById(req.body.id).exec();
    }catch(err){
        console.log(err);
        return res.status(504).json({success: false, message:'finding Product failed'});
    }
    return res.status(200).json({ success:true, message:'Product found',products });

}

const deleteProducts= async(req,res)=>{
    let products
    try{
         products=await Products.findByIdAndRemove(req.params.id);
    }catch(err){
        console.log(err);
        return res.status(504).json({success: false, message:'deleting Products failed'});
    }

    return res.status(200).json({ success:true, message:'Product deleted',products});
}

const updateProducts= async(req,res)=>{
    let products 
    try{
        products=await Products.findByIdAndUpdate(req.body.id,req.body)
    }catch(err){
        console.log(err);
        return res.status(504).json({success: false, message:'updating Products failed'});
    }
    return res.status(200).json({ success:true, message:'Product updated',products});
}

module.exports={createProducts,getProducts,getAProduct,deleteProducts,updateProducts};