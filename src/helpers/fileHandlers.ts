import fs from 'fs'
import path from 'path'

export default class FileHandling {
	public static async writeDataToFile(fileName: string, content: any) {
		fs.writeFileSync(fileName, JSON.stringify(content), 'utf8')
	}

	public static async readDataFile(fileName: string) {
		const rawData = fs.readFileSync(fileName, 'utf8')
		const storedData = JSON.parse(rawData)
		return storedData
	}

	public static getFilePath() {
		const stage = process.env.NODE_ENV
		const fileName = stage === 'test' ? 'testFile.json' : 'metric.json'
		const filePath = path.join(__dirname, '../../', 'dataFile/', fileName)
		return filePath
	}
}
