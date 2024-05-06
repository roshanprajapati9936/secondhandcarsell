import express from 'express'
import { loginController, registerController } from '../controllers/user.controller'

const router = express.Router()

// register ||
router.post("/register", registerController)

//login || 
router.post("/login", loginController)

export default router