import { Queue } from "bullmq";
import redis from "../config/redis.js";

const emailDLQ = new Queue("email-dlq", {
  connection: redis,
});

export default emailDLQ;
