import fs from 'fs'

export default class FileHandling {
	public static async writeDataToFile(fileName: string, content: any) {
		fs.writeFileSync(fileName, JSON.stringify(content), 'utf8')
	}

	public static async readDataFile(fileName: string) {
		const rawData = fs.readFileSync(fileName, 'utf8')
		const storedData = JSON.parse(rawData)
		return storedData
	}
}


// export function getMedian(input: number[]) {
//   if (input.length === 0) {
//     return 0
//   }

//   const sortedValues = input.sort((a, b) => a - b)
//   const medianPointer = Math.floor(sortedValues.length / 2)
//   if (sortedValues.length % 2 === 0) {
// 		return Math.min(sortedValues[medianPointer], sortedValues[medianPointer - 1])
//   }
//   return sortedValues[medianPointer]
// }

// export function getAverage(input: number[]) {
//   if (input.length === 0) {
//     return 0
//   }
//   const sumValues = input.reduce(
// 		(firstValue: number, secondValue: number) => firstValue + secondValue,
// 		0,
// 	)
// 	const average = sumValues / input.length
// 	return average
// }
