import { Box, Link, Typography } from '@mui/material'
import { Product } from '@/shared/types'
import { MouseEvent } from 'react'
import { SearchNothing } from './search-nothing'

type SearchResultsProps = {
	results: Product[]
	onClick: (product: Product) => void
}

export function SearchResults({
	results,
	onClick,
}: SearchResultsProps): JSX.Element {
	const handleClick = (
		evt: MouseEvent<HTMLAnchorElement>,
		product: Product
	) => {
		evt.preventDefault()
		onClick(product)
	}

	if (results.length) {
		return (
			<Box sx={{ p: 4 }}>
				{results.map(item => (
					<Typography key={item.id}>
						<Link
							href={item.code.toString()}
							onClick={evt => handleClick(evt, item)}
						>
							{item.title}
						</Link>
					</Typography>
				))}
			</Box>
		)
	}

	return <SearchNothing />
}
