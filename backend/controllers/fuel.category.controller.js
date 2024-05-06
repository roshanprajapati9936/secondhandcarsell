import fuelCategoryModel from "../models/fuel.category.model"

// create category
export const craeteFuelCategoryController = async(req,res)=>{
    try{
      const {fuel_name} =req.body
      
      const saveCategories = new fuelCategoryModel({
         fuel_name : fuel_name
      })
      saveCategories.save()
      if(saveCategories){
        return res.status(200).json({
             data: saveCategories,
             message:'created successfully'
        })
      }
      return res.status(400).json({
        message:'Bad request'
      })
    }catch(error){
        console.log(error.message)
        return res.status(500).json({
             message:error.message
        })
    }
}

// get all  category
export const getAllFuelCategoryController = async(req,res)=>{
    try{
     const categories = await fuelCategoryModel.find()
      return res.status(201).json({
          data: categories,
          message:'fetched'
      })
    }catch(error){
      console.log(error)
      return res.status(500).json({
        message:error.message
      })
    } 
}

// single category
export const  singleFuelCategoryController = async(req,res)=>{
  try{
        const categoriesID = req.params.category_id
        const category = await fuelCategoryModel.findOne({_id:categoriesID})
        if(category){
          return res.status(200).json({
            data:category,
            message:'Fetched'
          })
        }
        return res.status(400).json({
          message :' Bed request'
        })
        
  }catch(error){
     console.log(error)
     return res.status(500).json({
      message: error.message
     })
  }
}

// update category
export const updateFuelCategoryController = async(req,res)=>{
   try{
     const categoriesID = req.params.category_id
     const {fuel_name} = req.body
     const updatedCategory = await fuelCategoryModel.updateOne({_id:categoriesID},{
           $set:{
               fuel_name : fuel_name
           }
     });
     if(updatedCategory){
      return res.status(200).json({
        data:updatedCategory,
        message:"updated category"
      })
     }
     return res.status(400).json({
      message:'Error while updating'
     })

   }catch(error){
     console.log(error)
     return res.status(500).json({
      message:error.message
     })
   }
}

// delete category
export const deleteFuelCategoryController = async(req,res)=>{
  try{
   const  categoriesID = req.params.category_id
   const deleteCategory = await fuelCategoryModel.findOneAndDelete({_id :categoriesID })
   if(deleteCategory){
    return res.status(200).json({
      data:deleteCategory,
      message:'Deleted successfully'
    })
   }
  }catch(error){
      return res.status(500).json({
        message:error.message
      })
  }
}