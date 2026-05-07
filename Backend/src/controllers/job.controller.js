import * as jobService from "../services/job.service.js";

export const createJob = async (req, res) => {

  try {

    const result = await jobService.createJob(
      req.body,
      req.user
    );

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: result,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};