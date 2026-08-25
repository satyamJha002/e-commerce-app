import mongoose from "mongoose";
import Auth from "../models/auth.model.js";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: Number(process.env.MONGO_MAX_POOL_SIZE) || 20,
      minPoolSize: Number(process.env.MONGO_MIN_POOL_SIZE) || 2,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    const indexes = await Auth.collection.indexes();
    const googleIndex = indexes.find((index) => index.name === "googleId_1");

    if (googleIndex) {
      await Auth.collection.dropIndex("googleId_1");
    }

    await Auth.syncIndexes();
    console.log(`Connected to DB: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to DB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
