// Necessary imports
import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./features";

// Load environment variables
dotenv.config();

// Create express app
const app: Express = express();

// Middlewares
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use("/api", router);

// Default route for testing
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Export app
export default app;