import swaggerJSDoc from 'swagger-jsdoc'
import path from 'path'
const baseUrl = path.join(__dirname, '../')

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'Express API for DCS Metric Task',
		version: '1.0.0',
		description:
			'This is a REST API application made with Express in accordance to the metric task',
		license: {
			name: 'Licensed Under MIT',
			url: 'https://pclass.com/licenses/MIT.html',
		},
		contact: {
			name: 'Taiwo Yinusa',
			url: 'teeliny@gmail.com',
		},
	},
	servers: [
		{
			url: 'https://dcs-bej202110.herokuapp.com',
			description: 'Production Env',
		},
		{
			url: 'http://localhost:3008',
			description: 'Local server',
		},
	],
	tags: [
		{
			name: 'Base',
			description: 'The base API that describe the application',
		},
		{
			name: 'Metric',
			description: 'API for post metric, delete current window and get median of the specified metric',
		},
	],
}

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: [`${baseUrl
    }/docs/*.yaml`],
}

export const swaggerSpec = swaggerJSDoc(options)
