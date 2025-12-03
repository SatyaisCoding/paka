import { Hono } from "hono";

const routes = new Hono();

routes.get("/", (c) => c.json({ message: "Main route working!" }));

export default routes;
