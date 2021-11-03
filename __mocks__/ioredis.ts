class Redis {
	private static data: Record<string, any> = {}

	public async set(
		key: string,
		value: any,
		format: string = 'EX',
		expires: number,
	) {
        Redis.data[key] = value
        return 1
	}

	public async get(key: string) {
		return Redis.data[key]
	}
}

export default Redis
