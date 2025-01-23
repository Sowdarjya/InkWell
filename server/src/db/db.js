import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(`connected to DB. Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log(`DB connection error:${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
