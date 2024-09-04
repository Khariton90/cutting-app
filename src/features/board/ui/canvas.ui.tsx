import { MouseEvent, useEffect, useRef, useState } from 'react'
import styles from './board.module.css'
import { Segment } from '../../../shared'

interface IRect {
	id?: number
	x: number
	y: number
	width: number
	height: number
}
export function isCheckAABB(entity: IRect, area: IRect) {
	console.log(
		entity.x < area.x + area.width &&
			entity.x + entity.width > area.x &&
			entity.y < area.y + area.height &&
			entity.y + entity.height > area.y
	)
}

function draw(context: CanvasRenderingContext2D, segment: Segment) {
	context.fillStyle = 'transparent'
	context.strokeStyle = 'blue'
	context.strokeRect(segment.x, segment.y, segment.width, segment.height)
	context.fillRect(segment.x, segment.y, segment.width, segment.height)
}

function getMousePos(
	evt: MouseEvent<HTMLCanvasElement>,
	canvas: HTMLCanvasElement | null
) {
	if (!canvas) {
		return false
	}
	const rect = canvas.getBoundingClientRect()
	return {
		x: (evt.clientX - rect.left) / (rect.right - rect.left),
		y: (evt.clientY - rect.top) / (rect.bottom - rect.top),
	}
}

type CanvasProps = {
	segments: Segment[]
}

export function Canvas({ segments }: CanvasProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)

	useEffect(() => {
		if (canvasRef.current) {
			setContext(canvasRef.current.getContext('2d'))
		}
	}, [canvasRef])

	return <canvas className={styles.canvas} ref={canvasRef}></canvas>
}
