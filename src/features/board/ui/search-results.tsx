import { Typography } from '@mui/material'
import { Product } from '../../../shared'
import { MouseEvent } from 'react'

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

	if (!results.length) {
		return <Typography sx={{ p: 4 }}>Ничего не найдено</Typography>
	}

	return (
		<>
			{results.map(item => (
				<Typography key={item.id} sx={{ p: 2 }}>
					<a
						href={item.code.toString()}
						onClick={evt => handleClick(evt, item)}
					>
						{item.title}
					</a>
				</Typography>
			))}
		</>
	)
}
