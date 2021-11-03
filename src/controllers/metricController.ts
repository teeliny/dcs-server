import { Request, Response } from 'express'
import MetricService from '../service/metricService'
import ErrorResponseHandler from '../helpers/errorhandlers'
import { customStatus } from '../types/types'
// import { signJWTToken } from '../helpers/jwt'

export default class AcronymController {
	public static fetchMetric(req: Request, res: Response) {
		const { metric } = req.params as {
			metric: string
		}
		if (!metric.trim()) {
			throw new ErrorResponseHandler(
				customStatus.BAD_REQUEST,
				'Bad URL string',
				res,
			)
		}
		return MetricService.getMetric(metric)
			.then((data) =>
				res
					.status(customStatus.OK)
					.json({ data, message: 'data successfully fetched' }),
			)
			.catch((error) => {
				throw new ErrorResponseHandler(
					customStatus.NOT_FOUND,
					error.message,
					res,
				)
			})
	}

	public static addNewMetric(req: Request, res: Response) {
		const { value } = req.body
		const { metric } = req.params
		if (!metric || !value) {
			throw new ErrorResponseHandler(
				customStatus.BAD_REQUEST,
				'empty request body',
				res,
			)
		}

		return MetricService.createMetric(metric, value)
			.then((data) => res.status(customStatus.CREATED).json({ data }))
			.catch((error) => {
				throw new ErrorResponseHandler(
					customStatus.BAD_REQUEST,
					error.message,
					res,
				)
			})
	}

	public static deleteMetric(req: Request, res: Response) {
		const metric = req.params.metric.trim()
		if (!metric) {
			throw new ErrorResponseHandler(
				customStatus.BAD_REQUEST,
				'empty request params',
				res,
			)
		}
		return MetricService.deleteMetric(metric)
			.then((data: any) => {
				if (!data) {
					throw new ErrorResponseHandler(
						customStatus.NOT_FOUND,
						'Metric not found',
						res,
					)
				}
				res
					.status(customStatus.OK)
					.json({ message: `${metric} average have been cleared` })
			})
			.catch((error) => {
				throw new ErrorResponseHandler(
					customStatus.BAD_REQUEST,
					error.message,
					res,
				)
			})
	}
}
