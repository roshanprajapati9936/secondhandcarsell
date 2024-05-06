import express from 'express'
import { careteTranCategoryController, deleteTransCategoryController, getAllTrasCategoryController, singleTransCategoryController, updateTransCategoryController } from '../controllers/transmission.controller'

const router = express.Router()

// create category
router.post("/create-transmission", careteTranCategoryController)

// get all category
router.get("/getAll-transmission", getAllTrasCategoryController)

// get single category
router.get("/single-transmission/:category_id", singleTransCategoryController)

// update catgory
router.put("/update-transmission/:category_id", updateTransCategoryController)

// delete category
router.delete("/delete-transmission/:category_id",deleteTransCategoryController)

export default router