import { connectDB, disconnectDB } from "./db/index.js";
import app from "./app.js"
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
})

; (async () => {
    try {
        await connectDB()
        app.listen(process.env.PORT || 4000, () => {
            console.log(`Server is running on PORT: ${process.env.PORT}`);
        })

        process.on('SIGINT', async () => {
            console.log('SIGINT received. Shutting down gracefully...');
            await disconnectDB();
            process.exit(0);
        });
        
        process.on('SIGTERM', async () => {
            console.log('SIGTERM received. Shutting down gracefully...');
            await disconnectDB();
            process.exit(0);
        });

    } catch (error) {
        console.log(`MongoDB Connection FAILED: ${error}`);
        process.exit(1);
    }
})()