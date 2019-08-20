
import {requestText} from "./request-text.js"
import {RequestParams} from "./interfaces.js"

export async function requestJson(params: RequestParams) {
	return JSON.parse(await requestText(params))
}
