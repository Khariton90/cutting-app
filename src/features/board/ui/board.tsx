import { observer } from 'mobx-react-lite'
import { BoardHeader } from './board-header'
import styles from './board.module.css'
import { SheetList } from './sheet-list'
import { Button, Typography } from '@mui/material'
import Divider from '@mui/material/Divider'
import { Segment } from '@/shared/types'
import { Canvas } from '@/entities/canvas'
import { FormDetails } from '@/entities/form-details'
import { setIdNumber, useStore } from '@/shared/libs'
import { CommonCutList } from '@/features/common-cut-list'

export function BoardUi(): JSX.Element {
	const { productStore, sheetStore } = useStore()
	const segments: Segment[] = [
		{
			id: setIdNumber(),
			x: 0,
			y: 0,
			width: 50,
			height: 50,
		},
	]

	const saveSheet = () => {
		if (productStore.currentProduct) {
			const sheet = {
				id: setIdNumber(),
				qty: 1,
				width: productStore.currentProduct.width,
				height: productStore.currentProduct.height,
			}

			sheetStore.addCurrent(null)
			sheetStore.addToList(sheet)
		}
	}

	return (
		<main className='main'>
			<div className={styles.container}>
				<BoardHeader />
				<SheetList />
				<div className={styles.canvasWrapper}>
					{productStore.currentProduct ? (
						<>
							<Typography>
								Материал: {productStore.currentProduct.title}
							</Typography>
							<div className={styles.boardCanvas}>
								<div className={styles.wrapper}>
									{productStore.currentProduct ? (
										<Canvas segments={segments} />
									) : null}
								</div>
							</div>
						</>
					) : (
						<div className={styles.boardCanvas}>
							<div className={styles.wrapper}></div>
						</div>
					)}
					<Divider variant='fullWidth' component='p' sx={{ m: 2 }} />
					<CommonCutList />
					<Divider variant='fullWidth' component='p' sx={{ m: 2 }} />
					<Typography>
						2400 x 1200 | Количество - {sheetStore.currentSheet?.qty}
					</Typography>
					<Typography>
						Количество деталей 22 | Площадь деталей - 5.52 м.кв.
					</Typography>
					<Button type='button' onClick={saveSheet}>
						Сохранить
					</Button>
				</div>
				<FormDetails />
			</div>
		</main>
	)
}

export const Board = observer(BoardUi)
