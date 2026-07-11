import redisClient, { isCacheAvailable } from "../config/redis.js";

export const cacheMiddleware = (ttlSeconds) => async (req, res, next) => {
    if (!isCacheAvailable()) {
        return next();
    }

    const key = `cache:${req.originalUrl}`;

    try {
        const cached = await redisClient.get(key);
        if (cached) {
            res.set("X-Cache", "HIT");
            return res.status(200).json(JSON.parse(cached));
        }
    } catch (error) {
        console.log(`Cache read failed for ${key}: ${error.message}`);
        return next();
    }

    const originalJson = res.json.bind(res);
    res.json = (body) => {
        if (res.statusCode === 200) {
            redisClient
                .set(key, JSON.stringify(body), "EX", ttlSeconds)
                .catch((error) =>
                    console.log(`Cache write failed for ${key}: ${error.message}`),
                );
        }
        res.set("X-Cache", "MISS");
        return originalJson(body);
    };

    next();
};

export const invalidateCache = async (prefix) => {
    if (!isCacheAvailable()) return;

    try {
        const stream = redisClient.scanStream({ match: `cache:*${prefix}*` });
        stream.on("data", (keys) => {
            if (keys.length) redisClient.del(...keys);
        });
    } catch (error) {
        console.log(`Cache invalidation failed for ${prefix}: ${error.message}`);
    }
};
