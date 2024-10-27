import mongoose, { disconnect } from "mongoose"
import { DB_NAME } from "../constants.js"

async function connectDB() {
    try {
        const dbInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Database Connected Successfully DB HOST: ${dbInstance.connection.host}`)
    } catch (error) {
        console.log(`MongoDB Connection FAILED: ${error}`);
        process.exit(1);
    }
}

async function disconnectDB(){
    try {
        await mongoose.disconnect()
        console.log("MongoDB Disconnected");
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

export { connectDB, disconnectDB }