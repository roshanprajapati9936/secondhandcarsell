import express from 'express'
import { createProductsController, deleteProductController, getAllProductController, singleProductController, updateProductController } from '../controllers/product.controller'

const router = express.Router()

// craete product
router.post("/create-product" , createProductsController)

// get all products
router.get("/getAll-products", getAllProductController)

// single products
router.get("/single-products/:category_id", singleProductController )

// update products
router.put("/update-product/:category_id", updateProductController)

// delete products
router.delete("/delete-product/:category_id", deleteProductController)


export default router