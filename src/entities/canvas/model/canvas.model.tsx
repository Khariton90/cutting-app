import { ICut, ICutForm } from '@/features/board'
import { Canvas } from 'fabric'
import uuid from 'react-uuid'
import { EmptyCutModel } from './empty-cut.model'
import { CanvasView } from './canvas.view'

export enum SheetSize {
	Width = 500,
	Height = 250,
}

export class CanvasModel {
	public cutList: ICut[] = []
	public emptyCut: EmptyCutModel
	public isCompleted = false
	public gap = 1.318

	private maxHeight = 0
	private isFirstRow = true
	private view: CanvasView
	private currentSheet: ICut
	private sheetLowerBound = {
		right: 0,
		bottom: 0,
	}
	private canvas: Canvas
	private prevPoint = {
		x: 0,
		y: 0,
	}
	private prevCutPoint = {
		x: 0,
		y: 0,
	}
	private COLOR_EMPTY = '#ffa500'

	constructor(canvas: Canvas) {
		this.canvas = canvas
		this.emptyCut = new EmptyCutModel(this.canvas)
		this.view = new CanvasView(this.canvas)
		this.currentSheet = {
			id: uuid(),
			top: (this.height - SheetSize.Height) / 2,
			left: (this.width - SheetSize.Width) / 2,
			width: SheetSize.Width,
			height: SheetSize.Height,
		}
		this.sheetLowerBound.right =
			this.currentSheet.left + this.currentSheet.width
		this.sheetLowerBound.bottom =
			this.currentSheet.top + this.currentSheet.height
		this.init()
	}

	get width() {
		return this.canvas.width
	}

	get height() {
		return this.canvas.height
	}

	public init() {
		this.prevPoint = {
			x: this.currentSheet.left,
			y: this.currentSheet.top,
		}

		this.prevPoint.x = this.currentSheet.left
		this.prevPoint.y = this.currentSheet.top
		this.prevCutPoint = { ...this.prevPoint }
		this.view.addSheet(this.currentSheet)
	}

	public addCut({ width, height }: ICutForm) {
		if (this.isCompleted) {
			return true
		}

		const nextPointRight = Math.floor(this.prevCutPoint.x + width)
		const nextPointBottom = Math.floor(this.prevCutPoint.y + height)

		if (nextPointRight > this.sheetLowerBound.right) {
			return this.createEmptyInColumn()
		}

		if (nextPointBottom > this.sheetLowerBound.bottom && this.isFirstRow) {
			return this.createEmptyInLastRow()
		}

		this.isFirstRow = false
		this.setMaxCuttingHeight(height)
		this.createCut(width, height)
	}

	private setMaxCuttingHeight(height: number) {
		if (this.maxHeight < height) {
			this.maxHeight = height
		}
	}

	private createEmptyInColumn() {
		const width = this.sheetLowerBound.right - this.prevCutPoint.x
		const height = this.maxHeight
		this.createCut(width, height, this.COLOR_EMPTY)
		this.prevCutPoint.x = this.prevPoint.x
		this.prevCutPoint.y = this.maxHeight + this.prevCutPoint.y + this.gap
		this.maxHeight = height
		this.isFirstRow = true
	}

	private createEmptyInLastRow() {
		const height = this.sheetLowerBound.bottom - this.prevCutPoint.y
		const width = SheetSize.Width
		this.isCompleted = true
		this.createCut(width, height, this.COLOR_EMPTY)
	}

	private createCut(width: number, height: number, fill: string = 'tomato') {
		const newCut = {
			id: uuid(),
			top: this.prevCutPoint.y,
			left: this.prevCutPoint.x,
			width,
			height,
		}
		this.cutList.push(newCut)
		this.view.addCut(newCut, fill)
		this.prevCutPoint.x += width + this.gap
	}
}
