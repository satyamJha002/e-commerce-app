import mongoose from 'mongoose'

const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            maxPoolSize: Number(process.env.MONGO_MAX_POOL_SIZE) || 20,
            minPoolSize: Number(process.env.MONGO_MIN_POOL_SIZE) || 2,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        console.log(`Connected to DB: ${conn.connection.host}`)
    }catch (error) {
        console.log(`Error connecting to DB: ${error.message}`);
        process.exit(1);
    }
}

export default connectDb;
