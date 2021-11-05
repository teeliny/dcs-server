import express, { Request, Response } from 'express'
import MetricController from '../controllers/metricController'

const router = express.Router()

/* GET base URL */
router.get('/', function (req: Request, res: Response) {
	return MetricController.baseController(req, res)
})

/* GET the median of the specified metric */
router.get('/:metric/median', function (req: Request, res: Response) {
	return MetricController.fetchMetric(req, res)
})

/* POST the current value to the specific metric with the active window */
router.post('/:metric', function (req: Request, res: Response) {
	return MetricController.addNewMetric(req, res)
})

/* Delete the content of the current metric leaving the active window value */
router.delete('/:metric', function (req:Request, res:Response) {
  return MetricController.deleteMetric(req, res)
})

export default router