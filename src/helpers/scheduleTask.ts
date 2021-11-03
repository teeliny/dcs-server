import path from 'path'
import { TaskTimer } from 'tasktimer'
import FileHandlers from './fileHandlers'
import ComputeHandlers from './computeHandlers'


function taskSchedule(metric: string) {
  const filePath =
		process.env.NODE_ENV === 'test'
			? path.join(__dirname, '../../dataFile/testFile.json')
			: path.join(__dirname, '../../dataFile/metric.json')
  const envDuration = process.env.WINDOW_DURATION as string
  const windowDuration = +envDuration / 1000
  const timer = new TaskTimer(1000)
  timer.add([
		{
			id: `${metric}`, // unique ID of the task
			tickInterval: windowDuration, // run every 20 ticks (5 x interval = 5000 ms)
			totalRuns: 1, // run 1 time only. (set to 0 for unlimited times)
			async callback(_task) {
				// code to be executed on each run
				const storedData = await FileHandlers.readDataFile(filePath)
				const currentIndex = storedData.findIndex(
					(singleData: { name: string }) =>
						singleData.name === metric.toLowerCase(),
				)
          // console.log('ended', {storedData})
				const { value, average } = storedData[currentIndex]
        const currentAverage = ComputeHandlers.getAverage(value)
        // console.log(currentAverage, '<<<<<<>>>>>>>>>>')
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
  timer.start()
}

export default taskSchedule