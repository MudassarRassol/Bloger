import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Manually load .env file

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

const connectdb = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
    console.log("Mongo URI:", process.env.MONGO_URI);

  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err}`);
    process.exit(1);
  }
};

export default connectdb;
