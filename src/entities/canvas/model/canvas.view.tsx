import { ICut, IRect, ISheet } from '@/features/board'
import { Canvas, IText, Line, Point, Rect, TPointerEventInfo } from 'fabric'

export class CanvasView {
	private canvas: Canvas
	private GRID_COLOR = '#1976d2'
	private GRID_CANVAS = 25
	private strokeDashArray = [2, 4]
	private SHEET_FILL = 'rgba(255,255,255,0.4)'
	private FONT_SIZE = 16
	private sheetList: IRect[] = []
	private cutList: IRect[] = []
	private TEXT_INDENT_LEFT_SIDE = 10

	constructor(canvas: Canvas) {
		this.canvas = canvas
		this.init()
	}

	get width() {
		return this.canvas.width
	}

	public addSheet({ id, top, left, width, height }: ISheet) {
		const rect = this.createRect(
			top,
			left,
			width,
			height,
			this.SHEET_FILL,
			'#000'
		)
		this.sheetList.push({
			id,
			rect,
		})
	}

	public addCut({ id, top, left, width, height }: ICut, fill: string) {
		const cutText = `${this.cutList.length + 1} | ${Math.floor(
			width
		)}x${Math.floor(height)}`

		const text = new IText(cutText, {
			fontSize: this.FONT_SIZE,
			top: top + this.TEXT_INDENT_LEFT_SIDE,
			left: left + this.TEXT_INDENT_LEFT_SIDE,
			width,
			height,
		})

		const rect = this.createRect(top, left, width, height, fill)
		this.canvas.add(text)
		this.cutList.push({
			id,
			rect,
		})
	}

	private init() {
		this.createGrid()
		this.zoom()
	}

	private createRect(
		top: number,
		left: number,
		width: number,
		height: number,
		fill: string = '#000',
		stroke: string = 'transparent'
	) {
		const rect = new Rect({
			top,
			left,
			width,
			height,
			fill,
			stroke,
		})
		this.canvas.add(rect)
		return rect
	}

	private createGrid() {
		for (let i = this.GRID_CANVAS; i < this.width; i += this.GRID_CANVAS) {
			if (i < this.canvas.height) {
				this.createGridLine(0, i, this.canvas.width, i)
			}
			this.createGridLine(i, 0, i, this.canvas.height)
		}
	}

	private createGridLine(x1: number, y1: number, x2: number, y2: number) {
		const options = {
			stroke: this.GRID_COLOR,
			strokeWidth: 1,
			selectable: false,
			strokeDashArray: this.strokeDashArray,
		}
		const line = new Line([x1, y1, x2, y2], options)
		this.canvas.add(line)
	}

	private zoom() {
		this.canvas.on('mouse:wheel', (opt: TPointerEventInfo<WheelEvent>) => {
			const delta = opt.e.deltaY
			let zoom = this.canvas.getZoom()
			zoom *= 0.999 ** delta

			if (zoom > 20) {
				zoom = 20
			}

			if (zoom <= 1) {
				zoom = 1
			}

			if (zoom > 1) {
				this.canvas.zoomToPoint(
					new Point({ x: opt.e.offsetX, y: opt.e.offsetY }),
					zoom
				)
			} else {
				this.canvas.absolutePan(new Point({ x: 0, y: 0 }))
			}

			opt.e.preventDefault()
			opt.e.stopPropagation()
		})
	}
}
