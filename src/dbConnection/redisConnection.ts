import RedisCache from '../config/redisCache'

const RedisClient = new RedisCache(process.env.CACHE_PORT as string)
export default RedisClient
