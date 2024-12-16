import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB = async () => {
    try {
        const db = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MONGODB Connected Successfully DB Host: ${db.connection.host}`);
        
    } catch (error) {
        console.log(`MONGODB Connection Failed ERROR: ${error}`);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
    } catch (error) {
        console.log(`MONGODB Disconnection Failed: ${error.message}`);
        process.exit(1);
    }
};

export { connectDB, disconnectDB };