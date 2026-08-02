import express from "express";
import onboardingRoutes from "./routes/onboarding.routes.js";
import authRoutes from "./routes/auth.routes.js";
import homeInfoRoutes from "./routes/homeInfo.routes.js";

const app = express();

app.use(express.json());

app.use("/api/onboarding", onboardingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/home-info", homeInfoRoutes);

export default app;