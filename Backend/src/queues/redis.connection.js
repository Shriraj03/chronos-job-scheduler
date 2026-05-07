import Redis from "ioredis";

export const redisConnection = new Redis({
  host: "127.0.0.1",
  port: 6380,
  maxRetriesPerRequest: null,
});

redisConnection.on("connect", () => {
  console.log("Redis connected ✅");
});

redisConnection.on("error", (err) => {
  console.log("Redis error ❌", err.message);
});