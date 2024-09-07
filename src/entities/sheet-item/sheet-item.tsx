import { Sheet } from '@/shared/types'
import { ListItem, ListItemText, Typography } from '@mui/material'

type SheetItemProps = {
	item: Sheet
}

export function SheetItem({ item }: SheetItemProps): JSX.Element {
	return (
		<ListItem
			alignItems='flex-start'
			sx={{ display: 'flex', flexDirection: 'column' }}
		>
			<ListItemText
				primary='Плита OSB 2440 × 1220× 10 мм'
				secondary={
					<>
						<Typography
							component='span'
							variant='body2'
							sx={{ color: 'text.primary', display: 'inline' }}
						>
							Количество {item.qty}:
						</Typography>
						<Typography component='p'>Количество деталей 20</Typography>
					</>
				}
			/>
		</ListItem>
	)
}
