export interface iDocument {
	name: string
	description: string
	_id: string
	__v: number
	createdAt: string
	updatedAt: string
	save(): Promise<Omit<iDocument, 'save' | 'toJSOn'>>
	toJSON?: () => Omit<Document, 'toJSON'>
}

export interface inputData {
	name: string
	description: string
}

export interface getQueryData {
	other_similar_search_possibilities: number
	acronyms: Record<string, any>
}

export enum ErrorTypes {
	'E400' = 'Bad Request',
	'E401' = 'Unauthorized',
	'E403' = 'Forbidden',
	'E404' = 'Not Found',
	'E500' = 'Internal Server Error',
	'E501' = 'Not Implemented',
	'E502' = 'Bad Gateway',
}

export enum customStatus {
	'OK' = 200,
	'CREATED' = 201,
	'ACCEPTED' = 202,
	'NO_CONTENT' = 204,
	'BAD_REQUEST' = 400,
	'UNAUTHORIZED' = 401,
	'FORBIDDEN' = 403,
	'NOT_FOUND' = 404,
	'INTERNAL_SERVER_ERROR' = 500,
	'NOT_IMPLEMENTED' = 501,
	'BAD_GATEWAY' = 502,
}
