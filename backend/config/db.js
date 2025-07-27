import mongoose from 'mongoose'

const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to DB: ${conn.connection.host}`)
    }catch (error) {
        console.log(`Error connecting to DB: ${error.message}`);
        process.exit(1);
    }
}

export default connectDb;
