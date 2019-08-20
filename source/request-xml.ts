
import {request} from "./request.js"
import {RequestParams} from "./interfaces.js"

export async function requestXml(params: RequestParams) {
	return (await request(params)).responseXML
}
