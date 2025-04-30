const express=require('express');
const SubCategory=require('../models/sub_category');
const subCategoryRouter=express.Router();

subCategoryRouter.post('/api/subcategories',async(req ,res)=>{
    try{
        const {categoryId,categoryName,image,subCategoryName}=req.body;
        const subcategory=new SubCategory({categoryId,categoryName,image,subCategoryName});
        await subcategory.save();
        return res.status(201).send(subcategory);
    }catch(e){
        res.status(500).json({error:e.message});
    }
});

subCategoryRouter.get('/api/categories/:categoryName/subcategories',async(req,res)=>{
    ///extract the categoryName from the req Url using Destructuring
    try{
        const {categoryName}=req.params;
        const subcategories=await SubCategory.find({categoryName:categoryName});
        //check if any subcategories were found
        if(!subcategories || subcategories.length==0){
            //if no subcategories are found, response with a status code 404 error
            return res.status(404).json({msg:'subcategories not found'});
        }else{
            return res.status(200).json({subcategories});
        }
    }catch(e){
        res.status(500).json({error:e.message});
    }

});

module.exports=subCategoryRouter;
