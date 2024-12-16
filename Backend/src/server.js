import dotenv from "dotenv"
import { connectDB, disconnectDB } from "./db/index.js"
import app from "./app.js";

dotenv.config(
    {
        path: "./.env"
    }
)

; (async () => {
    connectDB()
        .then(() => {
            app.listen(process.env.PORT || 4000, () => {
                console.log(`Server is running on port ${process.env.PORT || 4000}`);
            });
        })
        .catch((error) => {
            console.log(`MONGODB Connection Failed ERROR: ${error}`);
        })
})();

process.on("SIGINT", async () => {
    console.log("Gracefully shutting down...");
    await disconnectDB();
    process.exit(0);
});