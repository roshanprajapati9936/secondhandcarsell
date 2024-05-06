import transmissionModel from "../models/transmission.model"

// craete category
export const careteTranCategoryController = async(req,res)=>{
    try{
     const {transmission_name} = req.body
     const saveCategories = new transmissionModel({
        transmission_name : transmission_name
     })
     saveCategories.save()
     if(saveCategories){
        return res.status(200).json({
            data:saveCategories,
            message:'craeted successfully'
        })
     }
     return res.status(400).json({
          message:'Bad request'
     })

    }catch(error){
     console.log(error)
     return res.status(500).json({
        message:error.message
     })
    }
}

// get all categry
export const getAllTrasCategoryController = async(req,res)=>{
    try{
      const  categories = await transmissionModel.find()
      return res.status(201).json({
        data:categories,
        message : "Fetched"
      })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:error.message
        })
    }
}

// single category
export const singleTransCategoryController = async(req,res)=>{
    try{
        const categoriesID = req.params.category_id
        const categories = await transmissionModel.findOne({_id: categoriesID})
        if(categories){
            return res.status(200).json({
                data:categories,
                messsage:"fetched"
            })
        }
        return res.status(400).json({
            message:"Bad  request "
        })
    }catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

// update category
export const updateTransCategoryController = async (req, res) => {
    try {
       const categoriesID = req.params.category_id;
       const { transmission_name } = req.body;
       const updatedCategory = await transmissionModel.updateOne({ _id: categoriesID }, {
          $set: {
             transmission_name: transmission_name,
          }
       });
       if (updatedCategory) {
          return res.status(200).json({
             data: updatedCategory,
             message: "Updated successfully"
          });
       }
       return res.status(400).json({
          message: "Bad request"
       });
    } catch (error) {
       console.log(error);
       return res.status(500).json({
          message: error.message
       });
    }
 };

 // delete category
 export const deleteTransCategoryController = async(req,res)=>{
    try{
       const categoriesID= req.params.category_id
       const deleteCategories = await transmissionModel.deleteOne({_id:categoriesID})
       return res.status(201).json({
        data:deleteCategories,
        message:'Deleted successfully'
       })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:error.message
        })
    }
 }
 