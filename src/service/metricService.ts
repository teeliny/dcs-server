import fs from 'fs'
import path from 'path'
import FileHandling from '../helpers/fileHandlers'
import ComputeHandlers from '../helpers/computeHandlers'
import scheduleHandler from '../helpers/scheduleHandler'

const stage = process.env.NODE_ENV
 const relativePath =
		stage === 'test'
			? '../../dataFile/testFile.json'
			: '../../dataFile/metric.json'

const filePath = path.join(__dirname, relativePath)

export default class MetricService {
	public static async getMetric(metric: string) {
		const rawData = fs.readFileSync(filePath, 'utf8')
		const storedData = JSON.parse(rawData)

		const result = storedData.filter(
			(singleData: { name: string }) =>
				singleData.name === metric.toLowerCase(),
		)
		const median = ComputeHandlers.getMedian(result[0].average)
		return median
	}

	public static async createMetric(metric: string, inputValue: number) {
		const rawData = fs.readFileSync(filePath, 'utf8')
		const storedData = JSON.parse(rawData)
		// Find if the metric exist
		const index = storedData.findIndex(
			(singleData: { name: string }) =>
				singleData.name === metric.toLowerCase(),
		)
		// Check if the metric does not exist in the storage
		if (index === -1) {
			const newMetric = {
				name: metric.toLowerCase(),
				value: [inputValue],
				active: true,
				average: [],
			}
			storedData.push(newMetric)
			
			FileHandling.writeDataToFile(filePath, storedData)
			scheduleHandler(metric)
		}

		// Check if metric exist but no active window
		else if (index !== -1 && !storedData[index].active) {
			const { value } = storedData[index]
			const active = true
			value.push(inputValue)
			storedData[index] = {
				...storedData[index],
				active,
				value,
			}
			FileHandling.writeDataToFile(filePath, storedData)
			scheduleHandler(metric)
		}

		else {
		// Check if metric exist and active is true
			const { value } = storedData[index]
			value.push(inputValue)
			storedData[index] = {
				...storedData[index],
				value,
			}
			FileHandling.writeDataToFile(filePath, storedData)
		}
	
	}

	public static async deleteMetric(metric: string) {
		const rawData = fs.readFileSync(filePath, 'utf8')
		const storedData = JSON.parse(rawData)
		const index = storedData.findIndex(
			(singleData: { name: string }) =>
				singleData.name === metric.toLowerCase(),
		)
		storedData[index] = { ...storedData[index], average: [] }
		FileHandling.writeDataToFile(filePath, storedData)
		return storedData[index]
	}
}
