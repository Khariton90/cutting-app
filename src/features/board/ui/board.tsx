import { observer } from 'mobx-react-lite'
import { BoardHeader } from './board-header'
import styles from './board.module.css'
import { SheetList } from './sheet-list'
import { Button, Typography } from '@mui/material'
import Divider from '@mui/material/Divider'
import { CommonCut } from '@/shared/types'
import { Canvas } from '@/entities/canvas'
import { FormDetails } from '@/entities/form-details'
import { setIdNumber, useStore } from '@/shared/libs'
import { CommonCutList } from '@/features/common-cut-list'
import { useState } from 'react'

export function BoardUi(): JSX.Element {
	const { productStore, sheetStore } = useStore()
	const [commonCurrent, setCommonCurrent] = useState(CommonCut.Unknown)

	const saveSheet = () => {
		if (productStore.currentProduct) {
			const sheet = {
				id: setIdNumber(),
				qty: 1,
				width: productStore.currentProduct.width,
				height: productStore.currentProduct.height,
				segments: [],
			}

			sheetStore.addToList(sheet)
		}
	}

	const onChangeCommon = (value: CommonCut) => {
		setCommonCurrent(() => value)
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
										<Canvas commonCurrent={commonCurrent} />
									) : null}
								</div>
							</div>
						</>
					) : (
						<div className={styles.boardCanvas}>
							<div className={styles.wrapper}>
								<Canvas commonCurrent={commonCurrent} />
							</div>
						</div>
					)}
					<Divider variant='fullWidth' component='p' sx={{ m: 2 }} />
					<CommonCutList onChangeCommon={onChangeCommon} />
					<Divider variant='fullWidth' component='p' sx={{ m: 2 }} />
					<Typography>2400 x 1200 | Количество - 1</Typography>
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
