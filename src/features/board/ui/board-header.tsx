import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'
import styles from './board.module.css'
import { useStore } from '@/shared/libs'
import { useState, ChangeEvent, FocusEvent } from 'react'
import { Product } from '@/shared/types'
import { SearchPopper } from './search-popper'
import { observer } from 'mobx-react-lite'
import { Search, SearchIconWrapper, StyledInputBase } from '@/shared'

function filterProduct(product: Product, search: string) {
	return (
		product.title.toLowerCase().includes(search.toLocaleLowerCase()) ||
		product.code.toString().includes(search.toLocaleLowerCase())
	)
}

export function BoardHeaderUi() {
	const { productStore } = useStore()
	const [searchTerm, setSearchTerm] = useState('')

	const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
	const handleClick = (event: FocusEvent<HTMLDivElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const onClose = () => {
		setAnchorEl(() => null)
	}
	const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(evt.target.value)
	}
	const searchProduct = () => {
		if (!searchTerm) {
			return productStore.products
		}
		return productStore.products.filter(product =>
			filterProduct(product, searchTerm)
		)
	}

	const results = searchProduct()
	const open = Boolean(anchorEl)
	const id = open ? 'simple-popover' : undefined

	return (
		<div className={styles.boardHeader}>
			<Box>
				<AppBar position='static'>
					<Toolbar>
						<Typography
							variant='h6'
							noWrap
							component='div'
							sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
						>
							{productStore.currentProduct
								? productStore.currentProduct.title
								: 'Выберите лист для распила'}
						</Typography>
						<Search onChange={handleChange} onFocus={handleClick}>
							<SearchIconWrapper>
								<SearchIcon />
							</SearchIconWrapper>
							<StyledInputBase
								aria-describedby={id}
								placeholder='Фанера, 640222'
								inputProps={{ 'aria-label': 'search' }}
							/>
						</Search>
					</Toolbar>
				</AppBar>
			</Box>
			<SearchPopper
				id={id}
				anchorEl={anchorEl}
				onClose={onClose}
				results={results}
				open={open}
			/>
		</div>
	)
}

export const BoardHeader = observer(BoardHeaderUi)
