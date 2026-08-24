import Redis from "ioredis";

const redis = new Redis({
  host: "localhost",
  port: 6380,
  maxRetriesPerRequest: null,
});

redis.on("connect", () => {
  console.log("redis connection successfully");
});

export default redis;
