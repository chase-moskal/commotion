
export interface RequestParams {
	url: string
}

export interface JsonCallParams extends RequestParams {
	data: any
	method?: string
}
