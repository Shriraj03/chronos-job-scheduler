import dotenv from "dotenv";
dotenv.config();

import express from "express";

import sequelize from "./config/db.js";
import "./models/index.js";

import authRoutes from "./routes/auth.routes.js";
import jobRoutes from "./routes/job.routes.js";
import { startScheduler } from "./schedulers/job.scheduler.js";
import "./workers/job.worker.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {

    console.log("JWT SECRET:", process.env.JWT_SECRET);

    await sequelize.authenticate();
    console.log("DB connected ✅");

    await sequelize.sync({ alter: true });
    console.log("Tables synced ✅");

    startScheduler();//keeps polling every 5sec

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {

    console.error("Server startup error ❌", error);

  }
};

startServer();