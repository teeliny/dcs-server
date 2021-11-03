import { Response } from 'express'
import { ErrorTypes } from '../types/types'

export default class ErrorResponseHandler extends Error{
    public readonly statusCode: number;
    public readonly message: string;
    constructor(statusCode: number, message: string, response: Response){
        super(message)
        Object.setPrototypeOf(this, new.target.prototype)

        this.statusCode = statusCode
        this.message = message
        Error.captureStackTrace(this)
        this.processError(statusCode, message, response)
    }

    private processError(statusCode: number, message:string, response: Response){
        const errorType = `E${statusCode}` as keyof typeof ErrorTypes
        return response.status(statusCode).json({
            error: ErrorTypes[errorType],
            message: message,
        })
    }
}