import mongoose from "mongoose";
import carCategoryModel from "./car.category.model";
import fuelCategoryModel from "./fuel.category.model";
import transmissionModel from "./transmission.model";


const productSchema = new mongoose.Schema({

    carCategory: {
        type: mongoose.ObjectId,
        ref: carCategoryModel,
        required: true
    },
    fuelCategory: {
        type: mongoose.ObjectId,
        ref: fuelCategoryModel,
        required: true,
    },
    transCategory: {
        type: mongoose.ObjectId,
        ref: transmissionModel,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    driven: {
        type:String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type:Number,
        required: true
    },
    photo: {
        type: Array,
        default:null
    },
    thumbnail: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0,
    },

}, { timestamps: true })
export default mongoose.model("products", productSchema)