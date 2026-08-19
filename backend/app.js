import express from "express";
import onboardingRoutes from "./routes/onboarding.routes.js";
import authRoutes from "./routes/auth.routes.js";
import agencyAuthRoutes from "./routes/agency-auth.routes.js";
import homeInfoRoutes from "./routes/homeInfo.routes.js";
import emergencyRoutes from "./routes/emergency.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import cors from "cors";
import weatherRoutes from "./routes/weather.routes.js";
import agencyDashboardRoutes from "./routes/agency-dashboard.routes.js";
import agencyActivationCodeRoutes from "./routes/agency-activation-code.routes.js";
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/onboarding", onboardingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/home-info", homeInfoRoutes);
app.use("/api/emergency", emergencyRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/agency/auth", agencyAuthRoutes);
app.use("/api/agency/dashboard", agencyDashboardRoutes);
app.use("/api/agency/activation-codes", agencyActivationCodeRoutes);
export default app;
