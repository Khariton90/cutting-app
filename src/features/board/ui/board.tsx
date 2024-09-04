// import { useStore } from '../../../shared/libs'
import { observer } from 'mobx-react-lite'
import { BoardHeader } from './board-header'
import styles from './board.module.css'
import { FormDetails } from './form-details'
import { Canvas } from './canvas.ui'
import { Segment } from '../../../shared'
import { useStore } from '../../../shared/libs'

// const SHEET_COLOR = 'rgba(255,255,255,0.1)'

export function BoardUi(): JSX.Element {
	const segments: Segment[] = [
		{
			id: 1,
			x: 0,
			y: 0,
			width: 50,
			height: 50,
		},
	]

	const { productStore } = useStore()

	return (
		<main className='main'>
			<div className={styles.container}>
				<BoardHeader />

				<div className={styles.boardSheetList}>
					<h2>Листы</h2>
					<div className='sheetItem'></div>
				</div>
				<div className={styles.canvasWrapper}>
					<div className={styles.boardCanvas}>
						<div className={styles.wrapper}>
							{productStore.currentProduct ? (
								<Canvas segments={segments} />
							) : null}
						</div>
					</div>
				</div>
				<FormDetails />
			</div>
		</main>
	)
}

export const Board = observer(BoardUi)
