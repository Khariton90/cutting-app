import { observer } from 'mobx-react-lite'
import { BoardHeader } from './board-header'
import styles from './board.module.css'
import { SheetList } from './sheet-list'
import { Button, Typography } from '@mui/material'
import Divider from '@mui/material/Divider'
import { CommonCut } from '@/shared/types'
import { CanvasApp, CanvasModel } from '@/entities/canvas'
import { FormDetails } from '@/entities/form-details'
import { CommonCutList } from '@/features/common-cut-list'
import { ChangeEvent, useEffect, useState } from 'react'
import { Rect } from 'fabric'
import { useStore } from '@/shared/libs'

export type ISheet = {
	id: string
	top: number
	left: number
	width: number
	height: number
}

export type ICut = ISheet

export type IRect = {
	id: string
	rect: Rect
}

export type ICutForm = {
	width: number
	height: number
}

export function BoardUi(): JSX.Element {
	const { productStore } = useStore()
	const [commonCurrent, setCommonCurrent] = useState(CommonCut.Unknown)
	const [canvas, setCanvas] = useState<CanvasModel | null>(null)

	const [cut, setCut] = useState<ICutForm>({
		width: 100,
		height: 100,
	})

	const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setCut(prevCut => ({
			...prevCut,
			[evt.target.name]: +evt.target.value,
		}))
	}

	const initBoard = (canvas: CanvasModel) => {
		setCanvas(canvas)
	}

	const onChangeCommon = (value: CommonCut) => {
		setCommonCurrent(() => value)
	}

	const addCut = () => {
		if (!canvas) {
			return
		}

		canvas.addCut(cut)
	}

	useEffect(() => {}, [productStore.currentProduct])

	return (
		<main className='main'>
			<input
				type='number'
				placeholder='width'
				name='width'
				onChange={handleChange}
				value={cut.width}
			/>
			<input
				type='number'
				placeholder='height'
				name='height'
				onChange={handleChange}
				value={cut.height}
			/>
			<button onClick={addCut}>addcut</button>
			<div className={styles.container}>
				<BoardHeader />
				<SheetList />
				<div className={styles.canvasWrapper}>
					<div className={styles.boardCanvas}>
						<div className={styles.wrapper}>
							<CanvasApp commonCurrent={commonCurrent} initBoard={initBoard} />
						</div>
					</div>
					<Divider variant='fullWidth' component='p' sx={{ m: 2 }} />
					<CommonCutList onChangeCommon={onChangeCommon} />
					<Divider variant='fullWidth' component='p' sx={{ m: 2 }} />

					<Typography>2400 x 1200 | Количество - 1</Typography>
					<Typography>
						Количество деталей 22 | Площадь деталей - 5.52 м.кв.
					</Typography>
					<Button type='button'>Сохранить</Button>
				</div>
				<FormDetails />
			</div>
		</main>
	)
}

export const Board = observer(BoardUi)
