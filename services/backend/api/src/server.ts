import 'dotenv/config';
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { createServer } from "http";
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
import gmailRoutes from "./routes/gmail.js";
import googleRoutes from "./routes/google.js";
import calendarRoutes from "./routes/calendar.js";
import alarmRoutes from "./routes/alarms.js";
import notionRoutes from "./routes/notion.js";
import docsRoutes from "./routes/docs.js";
import telegramRoutes from "./routes/telegram.js";
import weatherRoutes from "./routes/weather.js";
import briefingRoutes from "./routes/briefing.js";
import reportRoutes from "./routes/report.js";
import kafkaRoutes from "./routes/kafka.js";
import socketRoutes from "./routes/socket.js";
import { initializeCollection, initializeQdrantGrpc } from "./lib/qdrant.js";
import { initRedis } from "./lib/redis.js";
import { initGoogleAuth } from "./services/google-auth.service.js";
import { initKafkaProducer, isKafkaConnected } from "./lib/kafka.js";
import { startKafkaConsumers } from "./workers/kafka-consumers.js";
import { initSocketIO } from "./lib/socket.js";

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
app.route("/gmail", gmailRoutes);
app.route("/google", googleRoutes);
app.route("/calendar", calendarRoutes);
app.route("/alarms", alarmRoutes);
app.route("/notion", notionRoutes);
app.route("/docs", docsRoutes);
app.route("/telegram", telegramRoutes);
app.route("/weather", weatherRoutes);
app.route("/briefing", briefingRoutes);
app.route("/report", reportRoutes);
app.route("/kafka", kafkaRoutes);
app.route("/socket", socketRoutes);
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

  // Initialize Qdrant (try gRPC first, fallback to REST)
  try {
    // Try to initialize gRPC client
    const grpcAvailable = await initializeQdrantGrpc();
    
    // Initialize collection (works with both gRPC and REST)
    await initializeCollection();
    
    if (grpcAvailable) {
      console.log("✅ Qdrant initialized with gRPC (high performance)");
    } else {
      console.log("✅ Qdrant initialized with REST (fallback)");
    }
  } catch (err) {
    console.warn("⚠️ Qdrant not available - vector features disabled:", (err as Error).message);
  }

  // Initialize Google Auth (load tokens from DB)
  try {
    await initGoogleAuth();
  } catch (err) {
    console.warn("⚠️ Google auth init failed:", (err as Error).message);
  }

  // Initialize Kafka
  try {
    await initKafkaProducer();
    if (isKafkaConnected()) {
      await startKafkaConsumers();
    }
  } catch (err) {
    console.warn("⚠️ Kafka not available - async processing disabled:", (err as Error).message);
  }

  // Create HTTP server with Hono
  const server = serve({
    fetch: app.fetch,
    port,
  });

  // Initialize Socket.IO on the same server
  try {
    // @ts-ignore - server is compatible with http.Server
    initSocketIO(server);
  } catch (err) {
    console.warn("⚠️ Socket.IO init failed:", (err as Error).message);
  }

  console.log(`🚀 Hono API listening @ http://localhost:${port}`);
  console.log(`🔌 Socket.IO ready @ ws://localhost:${port}`);
}

start();
