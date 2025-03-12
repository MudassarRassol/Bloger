import mongoose from "mongoose";

const connectdb  = async():Promise<void>=>{
    try{
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Connected to MongoDB");
    }
    catch(err){
        console.error(`Error connecting to MongoDB: ${err as Error }`);
        process.exit(1);
    }
}

export default connectdb;