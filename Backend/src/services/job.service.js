import { Job } from "../models/job.model.js";
import { Scheduling } from "../models/scheduling.model.js";

export const createJob = async (data, user) => {

  const {
    title,
    description,
    retryLimit,
    cron,
    runAt,
    timezone,
  } = data;

  const job = await Job.create({
    userId: user.userId,
    title,
    description,
    retryLimit,
  });

  const scheduling = await Scheduling.create({
    jobId: job.jobId,

    cron: cron || null,

    runAt: runAt || null,

    nextRunAt: runAt || new Date(),

    timezone,
  });

  return {
    job,
    scheduling,
  };

};