import { ICut, ISheet } from '@/features/board'
import { Canvas, Line, Point, TPointerEventInfo } from 'fabric'
import { SheetFactory } from './sheet-factory'
import { CutFactory } from './cut-factory'

export class CanvasView {
	private canvas: Canvas
	private GRID_COLOR = '#1976d2'
	private GRID_CANVAS = 25
	private strokeDashArray = [2, 4]

	private sheetFactory: SheetFactory
	private cutFactory: CutFactory

	constructor(canvas: Canvas) {
		this.canvas = canvas
		this.sheetFactory = new SheetFactory(this.canvas)
		this.cutFactory = new CutFactory(this.canvas)
		this.init()
	}

	get width() {
		return this.canvas.width
	}

	public addSheet(item: ISheet) {
		this.sheetFactory.addItem(item)
	}

	public addCut(item: ICut, fill: string) {
		this.cutFactory.addItem(item, fill)
	}

	private init() {
		this.createGrid()
		this.zoom()
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
