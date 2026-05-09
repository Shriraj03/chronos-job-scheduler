import express from "express";

import {

  createJob,

  getJobs,

  getExecutions,

  getStats,

  toggleJobStatus,

  deleteJob,

  updateJob,

  getExecutionLogs,

} from "../controllers/job.controller.js";

import { authMiddleware }
from "../middlewares/auth.middleware.js";

const router =
  express.Router();

router.post(
  "/",
  authMiddleware,
  createJob
);

router.get(
  "/",
  authMiddleware,
  getJobs
);

router.get(
  "/stats/overview",
  authMiddleware,
  getStats
);

router.get(
  "/:jobId/executions",
  authMiddleware,
  getExecutions
);

router.patch(
  "/:jobId/toggle",
  authMiddleware,
  toggleJobStatus
);

router.delete(
  "/:jobId",
  authMiddleware,
  deleteJob
);

router.put(
  "/:jobId",
  authMiddleware,
  updateJob
);

router.get(
  "/executions/:executionId/logs",
  authMiddleware,
  getExecutionLogs
);

export default router;