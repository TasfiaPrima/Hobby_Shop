const Category = require('../models/Category.model');

const createCategory= async(req,res)=>{
    const category=new Category(req.body)
    try{
        await category.save();
    }catch(err){
        console.log(err);
        return res.status(504).json({success: false, message:'creating Category failed',category});
    }
    return res.status(200).json({ success:true, message:'Category created' });
};

const getCategory= async(req,res)=>{
    let category
    try{
        category=await Category.find({});
    }catch(err){
        console.log(err);
        return res.status(504).json({success: false, message:'finding category failed'});
    }
    return res.status(200).json({ success:true, message:'category found',category });
}


const getACategory= async(req,res)=>{
    let category
    try{
        category=await Category.findById(req.body.id).exec();
    }catch(err){
        console.log(err);
        return res.status(504).json({success: false, message:'finding Category failed'});
    }
    return res.status(200).json({ success:true, message:'Category found',category });

}

const deleteCategory= async(req,res)=>{
    let category
    try{
         await Category.findByIdAndRemove(req.body.id);
    }catch(err){
        console.log(err);
        return res.status(504).json({success: false, message:'deleting category failed'});
    }

    return res.status(200).json({ success:true, message:'category deleted'});
}

const updateCategory= async(req,res)=>{
    let category 
    try{
        category=await Category.findByIdAndUpdate(req.body.id,req.body)
    }catch(err){
        console.log(err);
        return res.status(504).json({success: false, message:'updating category failed'});
    }
    return res.status(200).json({ success:true, message:'category updated',category});
}

module.exports= {createCategory,getCategory,getACategory,deleteCategory,updateCategory}