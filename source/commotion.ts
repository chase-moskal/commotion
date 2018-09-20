
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
}

/**
 * make a call to a json api
 */
export function jsonCall<ResponseData = any>({link, data}: JsonCallParams): Promise<ResponseData> {
	return new Promise<ResponseData>((resolve, reject) => {
		const request = new XMLHttpRequest()
		request.onload = () => {
			try {
				resolve(JSON.parse(request.responseText))
			}
			catch (error) {
				error.message = `error parsing json: ${error.message}`
				reject(error)
			}
		}
		request.onerror = event => {
			const error = new Error(`xhr request error: ${request.status} ${request.statusText}`)
			reject(error)
		}
		request.open("GET", link)
		try {
			request.send(JSON.stringify(data))
		}
		catch (error) {
			error.message = `error sending json: ${error.message}`
			reject(error)
		}
	})
}
