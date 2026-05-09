import * as jobService
from "../services/job.service.js";

import { Log }
from "../models/log.model.js";

export const createJob =
  async (req, res) => {

    try {

      const result =
        await jobService.createJob(

          req.body,

          req.user

        );

      res.status(201).json({

        success: true,

        ...result,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

export const getJobs =
  async (req, res) => {

    try {

      const jobs =
        await jobService.getJobs(
          req.user
        );

      res.status(200).json({

        success: true,

        jobs,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

export const getExecutions =
  async (req, res) => {

    try {

      const executions =
        await jobService.getExecutions(

          req.params.jobId

        );

      res.status(200).json({

        success: true,

        executions,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

export const getStats =
  async (req, res) => {

    try {

      const stats =
        await jobService.getStats(
          req.user
        );

      res.status(200).json({

        success: true,

        stats,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

export const toggleJobStatus =
  async (req, res) => {

    try {

      const job =
        await jobService.toggleJobStatus(

          req.params.jobId

        );

      res.status(200).json({

        success: true,

        job,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

export const deleteJob =
  async (req, res) => {

    try {

      const result =
        await jobService.deleteJob(

          req.params.jobId

        );

      res.status(200).json({

        success: true,

        ...result,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

export const updateJob =
  async (req, res) => {

    try {

      const job =
        await jobService.updateJob(

          req.params.jobId,

          req.body

        );

      res.status(200).json({

        success: true,

        job,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

export const getExecutionLogs =
  async (req, res) => {

    try {

      const { executionId } =
        req.params;

      const logs =
        await Log.findAll({

          where: {
            executionId,
          },

          order: [
            ["createdAt", "DESC"],
          ],

        });

      res.status(200).json({

        success: true,

        logs,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };