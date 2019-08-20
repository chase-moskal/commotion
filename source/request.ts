
import {RequestParams} from "./interfaces.js"

/**
 * Make an XHR request
 */
export async function request({url}: RequestParams) {
	return new Promise<XMLHttpRequest>((resolve, reject) => {
		const request = new XMLHttpRequest()
		request.onload = () => resolve(request)
		request.onerror = event => {
			const error = new Error(`xhr request error: ${request.status} ${request.statusText}`)
			reject(error)
		}
		request.open("GET", url)
		request.send()
	})
}
