import mongoose  from "mongoose";

const fuelSchema = new mongoose.Schema({
     fuel_name:{
        type:String,
        required:true,
     },
     role:{
        type:Number,
        default:0
     },
},{timestamps:true})
export default mongoose.model("fuel", fuelSchema)