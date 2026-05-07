import { jobQueue } from "./job.queue.js";

const clearQueue = async () => {

  await jobQueue.drain();

  console.log("Queue cleared ✅");

  process.exit(0);

};

clearQueue();