import  mongoose  from "mongoose";

const carSchema = new mongoose.Schema({
        car_name:{
            type:String,
            required:true,
        },
        role:{
            type:Number,
            default:0
        },
},{timestamps:true})
export default mongoose.model("Car",carSchema)