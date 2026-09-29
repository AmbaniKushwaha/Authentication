import mongoose from "mongoose";

export const connectDataBase = async()=>{
    try {
        mongoose.connect("mongodb://localhost:27017/authDemo");
        
    } catch (error) {
        console.error(error.message)
    }
}
