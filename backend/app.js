import express from "express";
import onboardingRoutes from "./routes/onboarding.routes.js";
import authRoutes from "./routes/auth.routes.js";
import homeInfoRoutes from "./routes/homeInfo.routes.js";
import emergencyRoutes from "./routes/emergency.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

app.use(express.json());

app.use("/api/onboarding", onboardingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/home-info", homeInfoRoutes);
app.use("/api/emergency", emergencyRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/dashboard", dashboardRoutes);

export default app;