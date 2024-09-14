import { CommonCut } from '@/shared/types'
import { CommonCutsModel } from './common-cuts.model'

export class CanvasModel {
	private STROKE_COLOR = '#FF0000'
	private GRID_COLOR = '#B7EFF0'
	private GRID_CANVAS = 25
	private CANVAS_WIDTH = 0
	private CANVAS_HEIGHT = 0

	private readonly view: CanvasRenderingContext2D
	private commonCuts: CommonCutsModel

	constructor(
		context: CanvasRenderingContext2D,
		width: number,
		height: number
	) {
		this.view = context
		this.CANVAS_WIDTH = width
		this.CANVAS_HEIGHT = height

		this.commonCuts = new CommonCutsModel(
			this.view,
			this.STROKE_COLOR,
			this.CANVAS_WIDTH,
			this.CANVAS_HEIGHT
		)
		this.drawGrid()
	}

	public clearCanvas() {
		this.view.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT)
	}

	public setCommonCut = (value: CommonCut) => {
		this.drawGrid()
		this.commonCuts.update(value)
	}

	public drawGrid = () => {
		this.clearCanvas()
		this.view.strokeStyle = this.GRID_COLOR
		for (let i = 0; i <= this.view.canvas.height; i = i + this.GRID_CANVAS) {
			this.view.beginPath()
			this.view.moveTo(0, i)
			this.view.lineTo(this.CANVAS_WIDTH, i)
			this.view.stroke()
			this.view.closePath()
		}
		for (let i = 0; i <= this.view.canvas.width; i = i + this.GRID_CANVAS) {
			this.view.beginPath()
			this.view.moveTo(i, 0)
			this.view.lineTo(i, this.view.canvas.height)
			this.view.stroke()
			this.view.closePath()
		}
	}
}
