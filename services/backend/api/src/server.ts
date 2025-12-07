import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import routes from "./routes/index.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import uploadRoutes from "./routes/upload.js";
import queryRoutes from "./routes/query.js";
import healthRoutes from "./routes/health.js";
import documentRoutes from "./routes/documents.js";
import sourceRoutes from "./routes/sources.js";
import taskRoutes from "./routes/tasks.js";
import reminderRoutes from "./routes/reminders.js";
import vectorRoutes from "./routes/vectors.js";
import { initializeCollection } from "./lib/qdrant.js";
import { initRedis } from "./lib/redis.js";

const app = new Hono();

// Enable CORS
app.use("*", cors());

// mount routes
app.route("/", routes);
app.route("/auth", authRoutes);
app.route("/users", userRoutes);
app.route("/documents", documentRoutes);
app.route("/sources", sourceRoutes);
app.route("/tasks", taskRoutes);
app.route("/reminders", reminderRoutes);
app.route("/upload", uploadRoutes);
app.route("/query", queryRoutes);
app.route("/vectors", vectorRoutes);
app.route("/health", healthRoutes);

const port = Number(process.env.PORT || 3000);

// Initialize services and start server
async function start() {
  // Initialize Redis
  try {
    await initRedis();
  } catch (err) {
    console.warn("⚠️ Redis not available - caching disabled:", (err as Error).message);
  }

  // Initialize Qdrant
  try {
    await initializeCollection();
    console.log("✅ Qdrant initialized");
  } catch (err) {
    console.warn("⚠️ Qdrant not available - vector features disabled:", (err as Error).message);
  }

  serve({ fetch: app.fetch, port });
  console.log(`🚀 Hono API listening @ http://localhost:${port}`);
}

start();
