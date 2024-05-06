import express from 'express'
import { createCategoriesController, deleteCategoryController, getCategoriesController, getSingleController, updateCategoriesController } from '../controllers/car.category.controller'

const router = express.Router()

// get categories
router.get("/get-categories", getCategoriesController)

// create category
router.post("/create-category", createCategoriesController)

// get single category
router.get("/single-category/:category_id",getSingleController)

// updated category
router.put("/updated-category/:category_id", updateCategoriesController)

// delete category
router.delete("/delete-category/:category_id",deleteCategoryController)

export default router