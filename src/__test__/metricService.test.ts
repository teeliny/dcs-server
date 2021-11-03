import MetricService from '../service/metricService'
import FileHandlers from '../helpers/fileHandlers'
import path from 'path'

beforeAll(() => {
	console.log('node_env', process.env.NODE_ENV)
	jest.useFakeTimers()
	jest.spyOn(global, 'setTimeout')
	
})
afterEach(() => {
	jest.runOnlyPendingTimers()
})
afterAll(async () => {
	const filePath = path.join(__dirname, '../../dataFile/metric.json')
	let storedData = await FileHandlers.readDataFile(filePath)
	storedData = []
	FileHandlers.writeDataToFile('parent', storedData)
})
describe('Testing Acronym service implementation', () => {
	test('Metric service that it can create new metric', async () => {
		await MetricService.createMetric('parent', 4)
		await MetricService.createMetric('parent', 10)
		expect(setTimeout).toHaveBeenCalledTimes(1)
	})

	test('Metric service can delete existing metric average', async () => {
		const data = await MetricService.getMetric('parent')
		console.log('<<<<<>>>>>>><<<', data)
		expect(data).toBeGreaterThan(0)
	})

	// test('Metric service can delete existing metric average', async () => {
	// 	const metric = 'Parent'
	// 	// const rawData = fs.readFileSync(filePath, 'utf8')
	// 	const storedData = await FileHandlers.readDataFile(filePath)
	// 	const result = storedData.filter(
	// 		(singleData: { name: string }) =>
	// 			singleData.name === metric.toLowerCase(),
	// 	)
	// 	const initialLength = result[0].average.length
	// 	const deletedMetric = await MetricService.deleteMetric(metric)
	// 	const laterLength = deletedMetric.average.length
	// 	expect(deletedMetric).toHaveProperty('average')
	// 	expect(initialLength).toBeGreaterThanOrEqual(laterLength)
	// })
})
