import MetricService from '../service/metricService'
import FileHandlers from '../helpers/fileHandlers'

const filePath = FileHandlers.getFilePath()
const metric = 'parent'

beforeAll(() => {
	jest.useFakeTimers()
	jest.spyOn(global, 'setTimeout')
	
})
afterEach(() => {
	jest.runOnlyPendingTimers()
})
afterAll(async () => {
	let storedData = await FileHandlers.readDataFile(filePath)
	storedData = []
	await FileHandlers.writeDataToFile(filePath, storedData)
})

describe('Testing Acronym service implementation', () => {
	test('Obtain base url', async () => {
		const data = MetricService.baseAppUrl()
		expect(data).toContain('BEJ202110')
	})

	test('Metric service that it can create new metric', async () => {
		await Promise.all([
			MetricService.createMetric(metric, Math.floor(Math.random() * 100)),
			MetricService.createMetric(metric, Math.floor(Math.random() * 100))
		])
		const storedData = await FileHandlers.readDataFile(filePath)
		const filteredData = storedData.filter((singleData: { name: string }) => singleData.name === metric)
		const valueLength = filteredData[0].value.length
		expect(valueLength).toBeGreaterThan(0)
	})

	test('Metric service can obtain the metric average', async () => {
		const data = await MetricService.getMetric(metric)
		expect(data).toBeGreaterThan(0)
	})

	test('Metric service can delete existing metric average', async () => {
		const storedData = await FileHandlers.readDataFile(filePath)
		const result = storedData.filter(
			(singleData: { name: string }) =>
				singleData.name === metric.toLowerCase(),
		)
		const initialLength = result[0].average.length
		const deletedMetric = await MetricService.deleteMetric(metric)
		const laterLength = deletedMetric.average.length
		expect(deletedMetric).toHaveProperty('average')
		expect(initialLength).toBeGreaterThanOrEqual(laterLength)
		expect(laterLength).toBe(0)
	})
})
