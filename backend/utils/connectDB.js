import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
};

export default connectDb;
