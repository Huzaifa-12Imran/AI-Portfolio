// Upstash Redis client with graceful fallback when env vars are missing

const hasRedis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;

// Lazy import to avoid crashing when env vars are absent
let _redis: import('@upstash/redis').Redis | null = null;

async function getRedis() {
  if (!hasRedis) return null;
  if (_redis) return _redis;
  const { Redis } = await import('@upstash/redis');
  _redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
  return _redis;
}

export const redis = {
  async get(key: string) {
    const r = await getRedis();
    if (!r) return null;
    return r.get(key);
  },
  async set(key: string, value: string, opts?: { ex: number }) {
    const r = await getRedis();
    if (!r) return;
    if (opts?.ex) {
      await r.set(key, value, { ex: opts.ex });
    } else {
      await r.set(key, value);
    }
  },
};
