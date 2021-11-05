import path from 'path'
import { TaskTimer } from 'tasktimer'
import FileHandlers from './fileHandlers'
import ComputeHandlers from './computeHandlers'


function taskSchedule(metric: string) {
	// Check the environment to be able to set the correct file path for testing
  const filePath =
		process.env.NODE_ENV === 'test'
			? path.join(__dirname, '../../dataFile/testFile.json')
			: path.join(__dirname, '../../dataFile/metric.json')

	// Get the window duration in environment variable and convert to seconds
  const envDuration = process.env.WINDOW_DURATION as string
  const windowDuration = +envDuration / 1000
  const timer = new TaskTimer(1000)
  timer.add([
		{
			id: `${metric}`, // use the metric name as the identification
			tickInterval: windowDuration, // run every ticks (windowDuration x interval = 5000 ms)
			totalRuns: 1, // run 1 time only.
			async callback(_task) {
				// Read file, filter the current metric, get average, update the file
				const storedData = await FileHandlers.readDataFile(filePath)
				const currentIndex = storedData.findIndex(
					(singleData: { name: string }) =>
						singleData.name === metric.toLowerCase(),
				)
				const { value, average } = storedData[currentIndex]
				const currentAverage = ComputeHandlers.getAverage(value)
				average.push(currentAverage)
				storedData[currentIndex] = {
					...storedData[currentIndex],
					average,
					active: false,
					value: [],
				}
				FileHandlers.writeDataToFile(filePath, storedData)
			},
		},
	])
	// Start the timer
  timer.start()
}

export default taskSchedule