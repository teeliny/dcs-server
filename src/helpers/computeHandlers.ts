export default class ComputeHandlers {
  public static getMedian(input: number[]) {
    if (input.length === 0) {
			return 0
		}

		const sortedValues = input.sort((a, b) => a - b)
		const medianPointer = Math.floor(sortedValues.length / 2)
		if (sortedValues.length % 2 === 0) {
			return Math.min(
				sortedValues[medianPointer],
				sortedValues[medianPointer - 1],
			)
		}
		return sortedValues[medianPointer]
  }

  public static getAverage(input: number[]) {
    if (input.length === 0) {
			return 0
		}
		const sumValues = input.reduce(
			(firstValue: number, secondValue: number) => firstValue + secondValue,
			0,
		)
		const average = sumValues / input.length
		return average
  }
}