import express from 'express'
import { craeteFuelCategoryController, deleteFuelCategoryController, getAllFuelCategoryController, singleFuelCategoryController, updateFuelCategoryController } from '../controllers/fuel.category.controller'

const router = express.Router()

//craete category
router.post("/create-fuelcategory", craeteFuelCategoryController)

// get all category
router.get("/getAll-fuelcategory", getAllFuelCategoryController)

// single category
router.get("/single-fuelcategory/:category_id", singleFuelCategoryController)

// update category
router.put("/update-fuelcategory/:category_id", updateFuelCategoryController)

// delete category
router.delete("/delete-fuelcategory/:category_id", deleteFuelCategoryController)
export default router