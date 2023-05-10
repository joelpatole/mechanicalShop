import express from "express";
import { registerRoutes } from "./routes/routes";
import { connectToMongo } from "./connection/connection.mongo";
import { populate } from "./utility/populateDb";

export const startServer = async () => {
    const app = express();

    await connectToMongo();
    registerRoutes(app); 
    const {PORT} = process.env;
    app.listen(PORT || 3500, () => {
        console.log("server is started on port : " + PORT || 3500);
    });
}