import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import styles from './board.module.css'
import { useStore } from '../../../shared/libs'
import { useState, ChangeEvent, FocusEvent } from 'react'
import { Product } from '../../../shared'

import { SearchPopper } from './search-popper'
import { observer } from 'mobx-react-lite'

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	width: '100%',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}))

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
								placeholder='Search…'
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
