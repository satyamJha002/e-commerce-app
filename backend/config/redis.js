import Redis from "ioredis";

const redisClient = new Redis(process.env.REDIS_URL || "redis://127.0.0.1:6379", {
    lazyConnect: true,
    maxRetriesPerRequest: 1,
    retryStrategy: () => null,
});

let isRedisAvailable = false;

redisClient.on("error", (error) => {
    if (isRedisAvailable) {
        console.log(`Redis connection lost: ${error.message}`);
    }
    isRedisAvailable = false;
});

redisClient.on("ready", () => {
    isRedisAvailable = true;
    console.log("Connected to Redis");
});

redisClient.connect().catch(() => {
    console.log("Redis not available, continuing without caching");
});

export const isCacheAvailable = () => isRedisAvailable;
export default redisClient;
