import { useEffect, useRef, useState } from 'react'
import styles from './canvas.module.css'
import { CommonCut } from '@/shared/types'

const STROKE_COLOR = '#FF0000'
const GRID_COLOR = '#B7EFF0'
const GRID_CANVAS = 25

const drawGrid = (context: CanvasRenderingContext2D) => {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height)
	context.strokeStyle = GRID_COLOR
	for (let i = 0; i <= context.canvas.height; i = i + GRID_CANVAS) {
		context.moveTo(0, i)
		context.lineTo(context.canvas.width, i)
		context.stroke()
		context.closePath()
	}
	for (let i = 0; i <= context.canvas.width; i = i + GRID_CANVAS) {
		context.moveTo(i, 0)
		context.lineTo(i, context.canvas.height)
		context.stroke()
		context.closePath()
	}
}

const drawHorizontal = (context: CanvasRenderingContext2D) => {
	const canvasWidth = context.canvas.width
	const canvasHeight = context.canvas.height
	context.beginPath()
	context.rect(0, 0, canvasWidth, canvasHeight / 2)
	context.rect(0, canvasHeight / 2, canvasWidth, canvasHeight / 2)
	context.strokeStyle = STROKE_COLOR
	context.stroke()
	context.closePath()
}

const drawVertical = (context: CanvasRenderingContext2D) => {
	const canvasWidth = context.canvas.width
	const canvasHeight = context.canvas.height
	const rectWidth = canvasWidth / 2
	context.beginPath()
	context.rect(0, 0, rectWidth, canvasHeight)
	context.rect(rectWidth, 0, rectWidth, canvasHeight)
	context.strokeStyle = STROKE_COLOR
	context.stroke()
	context.closePath()
}

const drawCross = (context: CanvasRenderingContext2D) => {
	const canvasWidth = context.canvas.width
	const canvasHeight = context.canvas.height
	const rectWidth = canvasWidth / 2
	const rectHeight = canvasHeight / 2
	context.beginPath()
	context.rect(0, 0, rectWidth, rectHeight)
	context.rect(rectWidth, 0, rectWidth, rectHeight)
	context.rect(0, rectHeight, rectWidth, rectHeight)
	context.rect(rectWidth, rectHeight, rectWidth, rectHeight)
	context.strokeStyle = STROKE_COLOR
	context.stroke()
	context.closePath()
}

const drawSixSection = (context: CanvasRenderingContext2D) => {
	const canvasWidth = context.canvas.width
	const canvasHeight = context.canvas.height
	const rectWidth = canvasWidth / 3
	const rectHeight = canvasHeight / 3
	context.beginPath()

	for (let i = 0; i <= canvasWidth; i += rectWidth) {
		context.rect(i, 0, rectWidth, rectHeight)
		context.rect(i, rectHeight, rectWidth, rectHeight)
		context.rect(i, canvasHeight - rectHeight, rectWidth, rectHeight)
		context.strokeStyle = STROKE_COLOR
		context.stroke()
		context.closePath()
	}
}

const CommonCutList = {
	[CommonCut.Cross]: (context: CanvasRenderingContext2D) => drawCross(context),
	[CommonCut.Horizontal]: (context: CanvasRenderingContext2D) =>
		drawHorizontal(context),
	[CommonCut.SixSections]: (context: CanvasRenderingContext2D) =>
		drawSixSection(context),
	[CommonCut.Vertical]: (context: CanvasRenderingContext2D) =>
		drawVertical(context),
}

type CanvasProps = {
	commonCurrent: CommonCut
}

export function Canvas({ commonCurrent }: CanvasProps): JSX.Element {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)

	useEffect(() => {
		if (canvasRef.current) {
			setContext(canvasRef.current.getContext('2d'))
		}
	}, [canvasRef])

	useEffect(() => {
		if (!context) {
			return
		}

		drawGrid(context)
		CommonCutList[commonCurrent](context)
	}, [context, commonCurrent])

	return <canvas className={styles.canvas} ref={canvasRef}></canvas>
}
