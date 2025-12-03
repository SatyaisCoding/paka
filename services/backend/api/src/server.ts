import { Hono } from "hono";
import { serve } from "@hono/node-server";
import routes from "./routes/index.js";
import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/upload.js";
import queryRoutes from "./routes/query.js";
import healthRoutes from "./routes/health.js";

const app = new Hono();

// mount routes
app.route("/", routes);
app.route("/auth", authRoutes);
app.route("/upload", uploadRoutes);
app.route("/query", queryRoutes);
app.route("/health", healthRoutes);
app.route("auth", authRoutes);

const port = Number(process.env.PORT || 3000);
serve({ fetch: app.fetch, port });

console.log(`Hono API listening @ http://localhost:${port}`);
