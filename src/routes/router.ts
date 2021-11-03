import express, { Request, Response } from 'express'
import MetricController from '../controllers/metricController'

const router = express.Router()

/* GET users listing. */
router.get('/:metric/median', function (req: Request, res: Response) {
	return MetricController.fetchMetric(req, res)
})
router.post('/:metric', function (req: Request, res: Response) {
	return MetricController.addNewMetric(req, res)
})
router.delete('/:metric', function (req:Request, res:Response) {
  return MetricController.deleteMetric(req, res)
})

export default router
