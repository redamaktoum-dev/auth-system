// Necessary imports
import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "@/features";
import { errorHandler } from "./middlewares/errorHandler";

// Session imports
import session from "express-session";
import { RedisStore } from "connect-redis";
import redis, { REDIS_KEYS } from "@/config/redis";

// Load environment variables
dotenv.config();

// Create express app
const app: Express = express();

// Session store and middleware
const redisStore = new RedisStore({
  client: redis,
  prefix: REDIS_KEYS.SESSION
});
app.use(session({
	store: redisStore,
	secret: String(process.env.SESSION_SECRET),
	resave: false,
	saveUninitialized: false,
	
	cookie: {
		secure: String(process.env.NODE_ENV) === "production",
		httpOnly: String(process.env.SESSION_HTTPONLT) === "true",
		maxAge: Number(process.env.SESSION_MAXAGE)
	}
}))

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
import { requireAuth } from "@/features/auth/middleware";
app.get("/protected", requireAuth, (req, res) => {
  res.json({
    message: "Protected route",
    session: req.session,
    sessionID: req.sessionID,
    user: req.user || null
  })
})

// Last middleware to catch all errors
app.use(errorHandler);

// Export app
export default app;