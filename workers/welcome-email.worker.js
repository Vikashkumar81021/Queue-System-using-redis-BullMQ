import { Worker } from "bullmq";
import redis from "../config/redis.js";

export const sendWelcomeEmailWorker = new Worker(
  "send-welcome-email",
  async (job) => {
    console.log("Job recived", job.data.email);
    console.log("processing email for sending welcome");
  },
  {
    connection: redis,
  },
);
sendWelcomeEmailWorker.on("completed", (job) => {
  console.log(`Job ${job.id} compeleted`);
});
