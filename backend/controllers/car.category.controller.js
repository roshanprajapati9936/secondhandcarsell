import carModel from "../models/car.category.model"

// get all categories
export const getCategoriesController = async(req,res)=>{
    try{
      
    const categories = await carModel.find()
        return res.status(200).json({
            success:true,
            message:"Fetched",
            categories
        })
       
    }catch(error){
      console.log(error)
       return  res.status(500).json({
          success:false,
          message : 'Error while getting all categories'
      })
    }
}
// create categories
export const createCategoriesController = async(req,res)=>{
    try{
     const {car_name} = req.body  
     const saveCategories = new carModel({
        car_name:car_name
     });
     saveCategories.save();
     if(saveCategories){
       return  res.status(201).json({
            data:saveCategories,
            message:"craeted category successfully"
        })
        res.status(400).json({
            message:'Bad Request'
        })
     }
    }catch(error){
       console.log(error)
    }
}
// single category
export const getSingleController = async(req,res)=>{
    try{
     const categoryID = req.params.category_id;
     const category = await carModel.findOne({_id: categoryID})
     if(category){
        return res.status(200).json({
            data:category,
            message:"Fetched"
        })
     }
     res.status(400).json({
        message:'Bad request'
    })

    }catch(error){
      console.log(error)
    }
}
// update category

export const updateCategoriesController = async(req,res)=>{
    try{
       const categoriesID = req.params.category_id;
       const {car_name} = req.body
       const updatedCategories = await carModel.updateOne({_id: categoriesID},{
        $set:{
            car_name:car_name,
        }
       });
       if(updatedCategories){
        return res.status(200).json({
            data: updatedCategories,
            message:"updated categories successfully"
        })
       }
       return res.status(400).json({
        message:'Bad Request'
    })

    }catch(error){
      console.log(error)
      return res.status(500).json({
        message:error.message
      })
    }
}
// delete category
export const deleteCategoryController = async(req,res)=>{
    try{
    const categoriesID = req.params.category_id;
    const deleteCategory = await carModel.deleteOne({_id:categoriesID})
    return res.status(200).json({
         data:deleteCategory,
         message:'deleted successfully'
    })
 
    }catch(error){
      console.log(error)
      return res.status(500).json({
        message:error.message
      })
    }
}