import Redis from 'ioredis'
import { getQueryData } from '../types/types'

export default class RedisCache {
	client: Redis.Redis

	constructor(config: string) {
		this.client = new Redis(config)
	}

	public async setValue(key: string, value: any, expires: number) {
		try {
			if (typeof value === 'object') {
				value = JSON.stringify(value)
			}
			const result = await this.client.set(key, value, 'EX', expires)
			return result
		} catch (error) {
			return null
		}
	}

	public async getValue(key: string) {
		try {
			const searchCache = await this.client.get(key)
			const result = searchCache
				? (JSON.parse(searchCache) as getQueryData)
				: null
			return result
		} catch (error) {
			return null
		}
	}
}