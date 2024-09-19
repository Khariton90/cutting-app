import { useEffect, useRef } from 'react'
import styles from './canvas.module.css'
import { CommonCut } from '@/shared/types'
import { CanvasModel } from '../model/canvas.model'
import { Canvas } from 'fabric'

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 500

type CanvasProps = {
	commonCurrent: CommonCut
	initBoard: (canvas: CanvasModel) => void
}

export function CanvasApp({ initBoard }: CanvasProps): JSX.Element {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)

	useEffect(() => {
		if (canvasRef.current) {
			const initCanvas = new Canvas(canvasRef.current, {
				width: CANVAS_WIDTH,
				height: CANVAS_HEIGHT,
			})

			initCanvas.renderAll()
			initBoard(new CanvasModel(initCanvas))

			return () => {
				initCanvas.dispose()
			}
		}
	}, [])

	return <canvas className={styles.canvas} ref={canvasRef}></canvas>
}
