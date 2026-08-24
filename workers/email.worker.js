import { Worker } from "bullmq";

import redis from "../config/redis.js";
import emailDLQ from "../queue/email.dlq.js";

const emailWorker = new Worker(
  "email-queue",
  async (job) => {
    console.log("Job received:", job.id);
    console.log("Email:", job.data.email);

    console.log("Processing email...");
    throw new Error("Email service failed");
  },
  {
    connection: redis,
  },
);
emailWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

emailWorker.on("failed", (job, err) => {
  console.log(
    `Job ${job.id} failed`,
    err.message,
    `attemptsMade: ${job.attemptsMade}`,
  );
  if (job.attemptsMade >= job.opts.attempts) {
    console.log(`job ${job.id} reache maximum`);
    emailDLQ.add("failed-email", {
      originalJobId: job.id,
      email: job.data.email,
      error: err.message,
    });
    console.log(`job ${job.id} move to dlq`);
  }
});
