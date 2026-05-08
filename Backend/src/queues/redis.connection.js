import IORedis from "ioredis";

export const redisConnection = new IORedis({

  host: process.env.REDIS_HOST,

  port: process.env.REDIS_PORT,

  maxRetriesPerRequest: null,

});

redisConnection.on("connect", () => {

  console.log("Redis connected ✅");

});

redisConnection.on("error", (err) => {

  console.log(
    "Redis error ❌",
    err.message
  );

});