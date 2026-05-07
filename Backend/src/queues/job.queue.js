import { Queue } from "bullmq";

import { redisConnection } from "./redis.connection.js";

export const jobQueue = new Queue(
  "jobQueue",
  {
    connection: redisConnection,
  }
);