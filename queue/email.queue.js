import { Queue } from "bullmq";
import redis from "../config/redis.js";
// Queue → job ko hold karti hai
const emailQueue = new Queue("email-queue", {
  connection: redis,
});

export default emailQueue;

export const videoQueue = new Queue("upload-video", {
  connection: redis,
});
