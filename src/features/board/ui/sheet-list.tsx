/* eslint-disable no-mixed-spaces-and-tabs */
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { ListItemAvatar } from '@mui/material'
import { useStore } from '@/shared/libs'
import { observer } from 'mobx-react-lite'

export function SheetListUi() {
	const { sheetStore } = useStore()

	return (
		<>
			<List
				sx={{
					width: '100%',
					maxWidth: 360,
				}}
			>
				{sheetStore.currentSheet ? (
					<>
						<ListItem
							alignItems='flex-start'
							sx={{ display: 'flex', flexDirection: 'column' }}
						>
							<ListItemAvatar></ListItemAvatar>
							<ListItemText
								primary='Плита OSB 2440 × 1220× 10 мм'
								secondary={
									<>
										<Typography
											component='span'
											variant='body2'
											sx={{ color: 'text.primary', display: 'inline' }}
										>
											Количество 4:
										</Typography>
										<Typography>— Количество деталей 10…</Typography>
									</>
								}
							/>
						</ListItem>
						<Divider variant='fullWidth' component='li' />
					</>
				) : null}
			</List>

			<List
				sx={{
					width: '100%',
					maxWidth: 360,
				}}
			>
				{sheetStore.cutSheetList.length
					? sheetStore.cutSheetList.map(sheetItem => (
							<ListItem
								alignItems='flex-start'
								sx={{ display: 'flex', flexDirection: 'column' }}
							>
								<ListItemAvatar></ListItemAvatar>
								<ListItemText
									primary='Плита OSB 2440 × 1220× 10 мм'
									secondary={
										<>
											<Typography
												component='span'
												variant='body2'
												sx={{ color: 'text.primary', display: 'inline' }}
											>
												Количество {sheetItem.qty}:
											</Typography>
											{' — Количество деталей 10…'}
										</>
									}
								/>
							</ListItem>
					  ))
					: null}
			</List>
		</>
	)
}

export const SheetList = observer(SheetListUi)
