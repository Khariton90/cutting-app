import { Box, Typography } from '@mui/material'

export function SearchNothing(): JSX.Element {
	return (
		<Box sx={{ p: 4 }}>
			<Typography>Ничего не найдено</Typography>
		</Box>
	)
}
