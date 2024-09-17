import mongoose from "mongoose";
const connectDB = async() =>{
    const connectionURL = process.env.MONGODB;

    await mongoose.connect(connectionURL)
    .then(()=> console.log("Mongodb connected successfully"))
    .catch(err => console.log("connection failed", err))
}
export default connectDB;