export interface CuttSheet {
	id: string
	x: number
	y: number
	width: number
	height: number
	qty: number
	segments: RectangleProps[]
}

export interface RectangleProps {
	id: string
	x: number
	y: number
	width: number
	height: number
	color: string
}
