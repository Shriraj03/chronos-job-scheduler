import express from "express";

import {

  createJob,

  getJobs,

  getExecutions,

  getStats,

  toggleJobStatus,

  deleteJob,

  updateJob,

} from "../controllers/job.controller.js";

import {

  authMiddleware,

} from "../middlewares/auth.middleware.js";

const router = express.Router();

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

router.put(
  "/:jobId",
  authMiddleware,
  updateJob
);

router.delete(
  "/:jobId",
  authMiddleware,
  deleteJob
);

export default router;