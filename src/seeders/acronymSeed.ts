import { promises as fs } from 'fs'
import path from 'path'
// import AcronymModel from '../model/acronymModel'
import RedisClient from '../dbConnection/redisConnection'

const seedData = async () => {
	const file = await fs.readFile(
		path.resolve(__dirname, '../../dataFile/acronym.json'),
		'utf8',
	)
	const processedFile = JSON.parse(file) as Record<string, any>[]
	// processedFile = processedFile.map((acronym) => {
	// 	const result = Object.entries(acronym)
	// 	return {
	// 		name: result[0][0],
	// 		description: result[0][1],
	// 	}
	// })
	const isDataSeeded = await RedisClient.getValue('seed')
	if (!isDataSeeded) {
		// const data = await AcronymModel.insertMany(processedFile)
		await RedisClient.setValue('seed', true, 60 * 10)
		// return data
		return processedFile
	}
}

export default seedData
