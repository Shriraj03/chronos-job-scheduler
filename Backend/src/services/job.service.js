import { Job } from "../models/job.model.js";

import { Scheduling } from "../models/scheduling.model.js";

import { Execution } from "../models/execution.model.js";

export const createJob = async (
  data,
  user
) => {

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

    status: "pending",

  });

  const scheduling =
    await Scheduling.create({

      jobId: job.jobId,

      cron,

      runAt:
        runAt || null,

      nextRunAt:
        runAt || null,

      timezone,

    });

  return {

    job,

    scheduling,

  };

};

export const getJobs = async (
  user
) => {

  return await Job.findAll({

    where: {
      userId: user.userId,
    },

    raw: true,

  });

};

export const getExecutions =
  async (jobId) => {

    return await Execution.findAll({

      where: {
        jobId,
      },

      order: [
        ["createdAt", "DESC"],
      ],

    });

  };

export const getStats =
  async (user) => {

    const totalJobs =
      await Job.count({

        where: {
          userId: user.userId,
        },

      });

    const successExecutions =
      await Execution.count({

        where: {
          status: "success",
        },

      });

    const failedExecutions =
      await Execution.count({

        where: {
          status: "failed",
        },

      });

    return {

      totalJobs,

      successExecutions,

      failedExecutions,

    };

  };

export const toggleJobStatus =
  async (jobId) => {

    const job =
      await Job.findByPk(jobId);

    if (!job) {

      throw new Error(
        "Job not found"
      );

    }

    job.isActive =
      !job.isActive;

    job.status =
      job.isActive
        ? "pending"
        : "paused";

    await job.save();

    return job;

  };

export const deleteJob =
  async (jobId) => {

    await Scheduling.destroy({

      where: {
        jobId,
      },

    });

    await Execution.destroy({

      where: {
        jobId,
      },

    });

    await Job.destroy({

      where: {
        jobId,
      },

    });

    return true;

  };

export const updateJob =
  async (jobId, data) => {

    const job =
      await Job.findByPk(jobId);

    if (!job) {

      throw new Error(
        "Job not found"
      );

    }

    await job.update({

      title: data.title,

      description:
        data.description,

      retryLimit:
        data.retryLimit,

    });

    return job;

  };