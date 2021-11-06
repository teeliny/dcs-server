import fs from 'fs'
import FileHandlers from '../helpers/fileHandlers'
import ComputeHandlers from '../helpers/computeHandlers'
import scheduleHandler from '../helpers/scheduleHandler'

export default class MetricService {
	public static baseAppUrl() {
		return 'Welcome to the base URL of applicant - BEJ202110'
	}

	public static async getMetric(metric: string) {
		const filePath = FileHandlers.getFilePath()
		const rawData = fs.readFileSync(filePath, 'utf8')
		const storedData = JSON.parse(rawData)

		const result = storedData.filter(
			(singleData: { name: string }) =>
				singleData.name === metric.toLowerCase(),
		)
		if (result.length === 0) {
			throw new Error(`No metric with name '${metric}' in the storage`)
		}
		const median = ComputeHandlers.getMedian(result[0].average)
		return median
	}

	public static async createMetric(metric: string, inputValue: number) {
		const filePath = FileHandlers.getFilePath()
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
			
			FileHandlers.writeDataToFile(filePath, storedData)
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
			FileHandlers.writeDataToFile(filePath, storedData)
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
			FileHandlers.writeDataToFile(filePath, storedData)
		}
	
	}

	public static async deleteMetric(metric: string) {
		const filePath = FileHandlers.getFilePath()
		const rawData = fs.readFileSync(filePath, 'utf8')
		const storedData = JSON.parse(rawData)
		const index = storedData.findIndex(
			(singleData: { name: string }) =>
				singleData.name === metric.toLowerCase(),
		)
		storedData[index] = { ...storedData[index], average: [] }
		FileHandlers.writeDataToFile(filePath, storedData)
		return storedData[index]
	}
}
