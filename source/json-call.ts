
import {JsonCallParams} from "./interfaces"

/**
 * Make an http post to a json api
 */
export async function jsonCall<ResponseData = any>({
	url,
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
		xhr.open(method, url, true)
		xhr.setRequestHeader("Content-Type", "application/json")

		// send the request
		xhr.send(requestPayload)
	})
}
