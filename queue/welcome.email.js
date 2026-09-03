import { Queue } from "bullmq";
import redis from "../config/redis.js";

export const welcomeMail = new Queue("send-welcome-email", {
  connection: redis,
});
