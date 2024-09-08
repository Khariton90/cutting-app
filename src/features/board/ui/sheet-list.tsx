/* eslint-disable no-mixed-spaces-and-tabs */
import List from '@mui/material/List'
import { useStore } from '@/shared/libs'
import { observer } from 'mobx-react-lite'
import { SheetItem } from '@/entities/sheet-item'
import styles from './board.module.css'

export function SheetListUi() {
	const { sheetStore } = useStore()
	const sx = {
		width: '100%',
		maxWidth: 360,
	}

	return (
		<div className={styles.boardSheetList}>
			<h2>Листы</h2>
			<List sx={sx}>
				{sheetStore.cutSheetList.length
					? sheetStore.cutSheetList.map(item => (
							<SheetItem key={item.id} item={item} />
					  ))
					: null}
			</List>
		</div>
	)
}

export const SheetList = observer(SheetListUi)
