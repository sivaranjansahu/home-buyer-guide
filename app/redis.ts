import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis/nodejs";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_URL as string,
    token: process.env.UPSTASH_REDIS_TOKEN as string,
})
export const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(3, "1d"),
});

