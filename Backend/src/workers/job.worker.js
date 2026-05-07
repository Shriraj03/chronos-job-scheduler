import { Worker } from "bullmq";

import { redisConnection } from "../queues/redis.connection.js";

import { Execution } from "../models/execution.model.js";

import { Log } from "../models/log.model.js";

export const jobWorker = new Worker(
    "jobQueue",

    async (job) => {

        console.log(
            `Processing Job: ${job.data.jobId}`
        );

        const execution = await Execution.create({
            jobId: job.data.jobId,
            status: "running",
            startedAt: new Date(),
        });

        try {

            await new Promise((resolve) =>
                setTimeout(resolve, 3000)
            );
            const randomFail = false;
            // const randomFail = Math.random() < 0.5;
            //const randomFail = true;// for testing

            if (randomFail) {
                throw new Error("Random job failure");
            }

            execution.status = "success";

            execution.retryCount = job.attemptsMade;

            execution.completedAt = new Date();

            await execution.save();

            await Log.create({
                executionId: execution.executionId,

                level: "info",

                message: "Job completed successfully",

                meta: {
                    jobId: job.data.jobId,
                },
            });

            console.log(
                `Job Completed: ${job.data.jobId}`
            );

        } catch (error) {

            execution.status = "failed";

            execution.retryCount = job.attemptsMade;

            execution.errorSummary = error.message;

            execution.completedAt = new Date();

            await execution.save();

            await Log.create({
                executionId: execution.executionId,

                level: "error",

                message: error.message,

                meta: {
                    jobId: job.data.jobId,
                },
            });
            
            console.log(
                `Job Failed: ${job.data.jobId}`
            );

            throw error;

        }

    },

    {
        connection: redisConnection,
    }
);

jobWorker.on("completed", (job) => {
    console.log(
        `Worker completed job ${job.id}`
    );
});

jobWorker.on("failed", (job, err) => {
    console.log(
        `Worker failed job ${job.id}: ${err.message}`
    );
});