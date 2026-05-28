import { Redis } from '@upstash/redis';

// Singleton — reutilizado entre invocações do mesmo processo.
// @upstash/redis usa HTTP internamente, então não há "conexão" persistente:
// cada chamada é uma requisição REST independente, ideal para serverless.
let _redis: Redis | null = null;

export const getRedis = (): Redis | null => {
  if (_redis) return _redis;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) return null;

  _redis = new Redis({ url, token });
  return _redis;
};

/** Lê um valor cacheado. Retorna null se inexistente ou se o Redis não estiver configurado. */
export const cacheGet = async <T>(key: string): Promise<T | null> => {
  const redis = getRedis();
  if (!redis) return null;
  try {
    return await redis.get<T>(key);
  } catch {
    return null;
  }
};

/** Salva um valor com TTL em segundos. Silencia erros para não quebrar o fluxo principal. */
export const cacheSet = async <T>(
  key: string,
  value: T,
  ttlSeconds: number,
): Promise<void> => {
  const redis = getRedis();
  if (!redis) return;
  try {
    await redis.set(key, value, { ex: ttlSeconds });
  } catch {
    // Cache miss silencioso — a aplicação continua sem cache.
  }
};
