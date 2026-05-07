import { Op } from "sequelize";

import { CronExpressionParser } from "cron-parser";

import { Scheduling } from "../models/scheduling.model.js";

import { jobQueue } from "../queues/job.queue.js";

export const startScheduler = () => {

  setInterval(async () => {

    try {

      console.log("Checking scheduled jobs...");

      const dueJobs = await Scheduling.findAll({
        where: {
          nextRunAt: {
            [Op.lte]: new Date(),
          },
        },
      });

      console.log(
        "Due Jobs Found:",
        dueJobs.length
      );

      for (const job of dueJobs) {

        await jobQueue.add(
          "executeJob",
          {
            jobId: job.jobId,
          },
          {
            attempts: 3,

            backoff: {
              type: "fixed",
              delay: 5000,
            },
          }
        );

        console.log(
          `Job Added To Queue: ${job.jobId}`
        );

        // =========================
        // RECURRING CRON JOB
        // =========================

        if (job.cron) {

          const interval =
            CronExpressionParser.parse(
              job.cron
            );

          job.nextRunAt =
            interval.next().toDate();

        }

        // =========================
        // ONE TIME JOB
        // =========================

        else {

          job.nextRunAt = null;

        }

        await job.save();

      }

    } catch (error) {

      console.log(
        "Scheduler Error:",
        error.message
      );

    }

  }, 5000);

};