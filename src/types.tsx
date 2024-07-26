export type TypeTask = {
	id: string | number
	body: string
}

export type TypeColumn = {
	id: string | number
	body: string
	task: TypeTask[]
}
