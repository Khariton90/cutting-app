import { setIdNumber } from '@/shared/libs'
import { CommonCut, Segment } from '@/shared/types'

export class CommonCutsModel {
	private STROKE_COLOR: string
	private readonly view: CanvasRenderingContext2D
	private CANVAS_WIDTH = 0
	private CANVAS_HEIGHT = 0

	public readonly state = {
		[CommonCut.Cross]: () => this.drawCross(),
		[CommonCut.Horizontal]: () => this.drawHorizontal(),
		[CommonCut.Vertical]: () => this.drawVertical(),
		[CommonCut.SixSections]: () => this.drawSixSection(),
	}

	constructor(
		context: CanvasRenderingContext2D,
		strokeColor: string,
		width: number,
		height: number
	) {
		this.view = context
		this.CANVAS_WIDTH = width
		this.CANVAS_HEIGHT = height
		this.STROKE_COLOR = strokeColor
	}

	public readonly update = (value: CommonCut) => {
		if (value === CommonCut.Unknown) {
			return
		}

		return this.state[value]()
	}

	public readonly drawHorizontal = (): Segment[] => {
		const segments: Segment[] = [
			{
				id: setIdNumber(1),
				x: 0,
				y: 0,
				width: this.CANVAS_WIDTH,
				height: this.CANVAS_HEIGHT / 2,
			},
			{
				id: setIdNumber(2),
				x: 0,
				y: this.CANVAS_HEIGHT / 2,
				width: this.CANVAS_WIDTH,
				height: this.CANVAS_HEIGHT / 2,
			},
		]

		this.view.beginPath()

		for (let i = 0; i < segments.length; i++) {
			this.view.rect(
				segments[i].x,
				segments[i].y,
				segments[i].width,
				segments[i].height
			)
		}
		this.view.strokeStyle = this.STROKE_COLOR
		this.view.stroke()
		this.view.closePath()

		return segments
	}

	public readonly drawVertical = (): Segment[] => {
		const rectWidth = this.CANVAS_WIDTH / 2

		const segments: Segment[] = [
			{
				id: setIdNumber(1),
				x: 0,
				y: 0,
				width: rectWidth,
				height: this.CANVAS_HEIGHT,
			},
			{
				id: setIdNumber(2),
				x: rectWidth,
				y: 0,
				width: rectWidth,
				height: this.CANVAS_HEIGHT,
			},
		]

		this.view.beginPath()
		for (let i = 0; i < segments.length; i++) {
			this.view.rect(
				segments[i].x,
				segments[i].y,
				segments[i].width,
				segments[i].height
			)
		}
		this.view.strokeStyle = this.STROKE_COLOR
		this.view.stroke()
		this.view.closePath()
		return segments
	}

	public readonly drawCross = (): Segment[] => {
		const rectWidth = this.CANVAS_WIDTH / 2
		const rectHeight = this.CANVAS_HEIGHT / 2

		const segments: Segment[] = [
			{ id: 1, x: 0, y: 0, width: rectWidth, height: rectHeight },
			{ id: 1, x: rectWidth, y: 0, width: rectWidth, height: rectHeight },
			{ id: 1, x: 0, y: rectHeight, width: rectWidth, height: rectHeight },
			{
				id: 1,
				x: rectWidth,
				y: rectHeight,
				width: rectWidth,
				height: rectHeight,
			},
		]

		this.view.beginPath()
		for (let i = 0; i < segments.length; i++) {
			segments[i].id = setIdNumber() + i
			this.view.rect(
				segments[i].x,
				segments[i].y,
				segments[i].width,
				segments[i].height
			)
		}

		this.view.strokeStyle = this.STROKE_COLOR
		this.view.stroke()
		this.view.closePath()
		return segments
	}

	public readonly drawSixSection = (): Segment[] => {
		const rectWidth = this.CANVAS_WIDTH / 3
		const rectHeight = this.CANVAS_HEIGHT / 3

		const segments: Segment[] = []

		for (let i = 0; i < this.CANVAS_WIDTH; i += rectWidth) {
			const row = [
				{
					id: setIdNumber(),
					x: i,
					y: 0,
					width: rectWidth,
					height: rectHeight,
				},
				{
					id: setIdNumber(),
					x: i,
					y: rectHeight,
					width: rectWidth,
					height: rectHeight,
				},
				{
					id: setIdNumber(),
					x: i,
					y: this.CANVAS_HEIGHT - rectHeight,
					width: rectWidth,
					height: rectHeight,
				},
			]

			segments.push(...row)
		}

		for (let i = 0; i < segments.length; i++) {
			this.view.beginPath()
			this.view.rect(
				segments[i].x,
				segments[i].y,
				segments[i].width,
				segments[i].height
			)

			this.view.strokeStyle = this.STROKE_COLOR
			this.view.stroke()
			this.view.closePath()
		}

		return segments
	}
}
