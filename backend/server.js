import express from 'express'
import mongoose from 'mongoose'
import carRouter from './routers/car.category.router'
import fuelRouter from './routers/fuel.category.router'
import transmission from './routers/transmission.router'
import productRouter from './routers/product.router'
import dotenv from 'dotenv'
import authUser from './routers/user.router'
import cors from 'cors'


dotenv.config()

const app = express()

app.use(express.json()); // body parser
app.use(cors());
app.use('/uploads/', express.static('uploads'));

const PORT = process.env.PORT

mongoose.connect('mongodb://127.0.0.1:27017/Car')
.then(()=>console.log('Connected!'));


app.listen(PORT,()=>{
    console.log(`Running on the port ${PORT}`)
})
app.use(carRouter)
app.use(fuelRouter)
app.use(transmission)
app.use(productRouter)
app.use(authUser)
