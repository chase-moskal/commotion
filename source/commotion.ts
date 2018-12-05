
/*

commotion — browser communication functions, xhr's

*/

export interface RequestParams {
	link: string
}

/**
 * make and http get request via xhr
 */
export function request({link}: RequestParams): Promise<XMLHttpRequest> {
	return new Promise<XMLHttpRequest>((resolve, reject) => {
		const request = new XMLHttpRequest()
		request.onload = () => resolve(request)
		request.onerror = event => {
			const error = new Error(`xhr request error: ${request.status} ${request.statusText}`)
			reject(error)
		}
		request.open("GET", link)
		request.send()
	})
}

/**
 * make an xhr request for an xml document
 */
export async function requestXml(params: RequestParams) {
	return (await request(params)).responseXML
}

/**
 * make an xhr request for a json document
 */
export async function requestJson(params: RequestParams) {
	return JSON.parse((await request(params)).responseText)
}

export interface JsonCallParams extends RequestParams {
	data: any
	method?: string
}

/**
 * make a call to a json api
 */
export function jsonCall<ResponseData = any>({
	link,
	data,
	method = "POST"
}: JsonCallParams): Promise<ResponseData> {
	return new Promise<ResponseData>((resolve, reject) => {

		// prepare the request payload json
		const requestPayload = (() => {
			try {
				return JSON.stringify(data)
			}
			catch (error) {
				error.message = `error with request json: ${error.message}`
				reject(error)
			}
		})()

		// create the xhr
		const xhr = new XMLHttpRequest()

		// handle response
		xhr.onload = () => {
			try {
				resolve(JSON.parse(xhr.responseText))
			}
			catch (error) {
				error.message = `error parsing response json: ${error.message}`
				reject(error)
			}
		}

		// handle error
		xhr.onerror = event => {
			const error = new Error(`xhr error: ${xhr.status} ${xhr.statusText}`)
			reject(error)
		}

		// open the connection and set headers
		xhr.open(method, link, true)
		xhr.setRequestHeader("Content-Type", "application/json")

		// send the request
		xhr.send(requestPayload)
	})
}
