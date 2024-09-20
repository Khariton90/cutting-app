import { IRect, ISheet } from '@/features/board'
import { Canvas } from 'fabric'
import { RectFactory } from './rect-factory'

export type CreateRect = {
	top: number
	left: number
	width: number
	height: number
	fill: string
	stroke: string
}

export class SheetFactory extends RectFactory<IRect> {
	canvas: Canvas
	private FILL = 'rgba(255,255,255,0.4)'

	constructor(canvas: Canvas) {
		super()
		this.canvas = canvas
	}

	public get sheetList() {
		return this.list
	}

	public addItem({ id, ...item }: ISheet) {
		const rect = this.createRect({
			...item,
			fill: this.FILL,
			stroke: '#000',
		})
		this.list.push({ id, rect })
	}

	private createRect(item: CreateRect) {
		const rect = this.create(item)
		this.canvas.add(rect)
		return rect
	}
}
