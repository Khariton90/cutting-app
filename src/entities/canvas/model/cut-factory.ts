import { ICut, IRect } from '@/features/board'
import { Canvas, IText } from 'fabric'
import { RectFactory } from './rect-factory'

export type CreateRect = {
	top: number
	left: number
	width: number
	height: number
	fill: string
	stroke: string
}

export class CutFactory extends RectFactory<IRect> {
	canvas: Canvas
	private TEXT_INDENT_LEFT_SIDE = 10
	private FONT_SIZE = 16
	private FILL = 'tomato'
	constructor(canvas: Canvas) {
		super()
		this.canvas = canvas
	}

	public get cutList() {
		return this.list
	}

	public addItem({ id, ...item }: ICut, fill: string = this.FILL) {
		const cutText = this.createText(item.width, item.height)

		const text = new IText(cutText, {
			fontSize: this.FONT_SIZE,
			top: item.top + this.TEXT_INDENT_LEFT_SIDE,
			left: item.left + this.TEXT_INDENT_LEFT_SIDE,
			width: item.width,
			height: item.height,
		})

		const rect = this.createRect({
			...item,
			fill,
			stroke: 'transparent',
		})
		this.canvas.add(text)
		this.list.push({
			id,
			rect,
		})
	}

	private createRect(item: CreateRect) {
		const rect = this.create(item)
		this.canvas.add(rect)
		return rect
	}

	private createText(width: number, height: number) {
		return `${this.list.length + 1} | ${Math.floor(width)}x${Math.floor(
			height
		)}`
	}
}
