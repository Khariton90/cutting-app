import { useEffect, useRef, useState } from 'react'
import styles from './canvas.module.css'
import { CommonCut } from '@/shared/types'
import { CanvasModel } from '../model/canvas.model'

const CANVAS_WIDTH = 500
const CANVAS_HEIGHT = 250

type CanvasProps = {
	commonCurrent: CommonCut
}

export function Canvas({ commonCurrent }: CanvasProps): JSX.Element {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
	const [model, setModel] = useState<CanvasModel | null>(null)

	useEffect(() => {
		if (canvasRef.current) {
			const context = canvasRef.current.getContext('2d')
			setContext(() => context)
		}
	}, [canvasRef])

	useEffect(() => {
		if (!context) {
			return
		}

		setModel(() => new CanvasModel(context, CANVAS_WIDTH, CANVAS_HEIGHT))
	}, [context])

	useEffect(() => {
		if (!model) {
			return
		}

		model.setCommonCut(commonCurrent)
	}, [commonCurrent, model])

	return (
		<canvas
			className={styles.canvas}
			ref={canvasRef}
			width={CANVAS_WIDTH}
			height={CANVAS_HEIGHT}
		></canvas>
	)
}
