import mongoose  from "mongoose";

const transmissionSchema = new mongoose.Schema({
    transmission_name:{
        type:String,
        required:true,
    },
    role:{
        type:Number,
        default:0
    },
},{timestamps:true})
export default mongoose.model("transmission",transmissionSchema)