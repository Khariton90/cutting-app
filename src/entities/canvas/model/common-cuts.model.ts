import { CommonCut } from '@/shared/types'

export class CommonCutsModel {
	#STROKE_COLOR: string
	#view: CanvasRenderingContext2D
	#CANVAS_WIDTH = 0
	#CANVAS_HEIGHT = 0

	#state = {
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
		this.#view = context
		this.#CANVAS_WIDTH = width
		this.#CANVAS_HEIGHT = height
		this.#STROKE_COLOR = strokeColor
	}

	update = (value: CommonCut) => {
		if (value === CommonCut.Unknown) {
			return
		}

		return this.#state[value]()
	}

	drawHorizontal = () => {
		this.#view.beginPath()
		this.#view.rect(0, 0, this.#CANVAS_WIDTH, this.#CANVAS_HEIGHT / 2)
		this.#view.rect(
			0,
			this.#CANVAS_HEIGHT / 2,
			this.#CANVAS_WIDTH,
			this.#CANVAS_HEIGHT / 2
		)
		this.#view.strokeStyle = this.#STROKE_COLOR
		this.#view.stroke()
		this.#view.closePath()
	}

	drawVertical = () => {
		const rectWidth = this.#CANVAS_WIDTH / 2
		this.#view.beginPath()
		this.#view.rect(0, 0, rectWidth, this.#CANVAS_HEIGHT)
		this.#view.rect(rectWidth, 0, rectWidth, this.#CANVAS_HEIGHT)
		this.#view.strokeStyle = this.#STROKE_COLOR
		this.#view.stroke()
		this.#view.closePath()
	}

	drawCross = () => {
		const rectWidth = this.#CANVAS_WIDTH / 2
		const rectHeight = this.#CANVAS_HEIGHT / 2
		this.#view.beginPath()
		this.#view.rect(0, 0, rectWidth, rectHeight)
		this.#view.rect(rectWidth, 0, rectWidth, rectHeight)
		this.#view.rect(0, rectHeight, rectWidth, rectHeight)
		this.#view.rect(rectWidth, rectHeight, rectWidth, rectHeight)
		this.#view.strokeStyle = this.#STROKE_COLOR
		this.#view.stroke()
		this.#view.closePath()
	}

	drawSixSection = () => {
		const rectWidth = this.#CANVAS_WIDTH / 3
		const rectHeight = this.#CANVAS_HEIGHT / 3

		for (let i = 0; i <= this.#CANVAS_WIDTH; i += rectWidth) {
			this.#view.beginPath()
			this.#view.rect(i, 0, rectWidth, rectHeight)
			this.#view.rect(i, rectHeight, rectWidth, rectHeight)
			this.#view.rect(
				i,
				this.#CANVAS_HEIGHT - rectHeight,
				rectWidth,
				rectHeight
			)
			this.#view.strokeStyle = this.#STROKE_COLOR
			this.#view.stroke()
			this.#view.closePath()
		}
	}
}
