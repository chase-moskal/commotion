
import {request} from "./request.js"
import {RequestParams} from "./interfaces.js"

export async function requestText(params: RequestParams) {
	return (await request(params)).responseText
}
