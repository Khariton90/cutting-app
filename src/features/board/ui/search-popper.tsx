import { Popover } from '@mui/material'
import { Product } from '../../../shared'
import { useStore } from '../../../shared/libs'
import { useState } from 'react'
import AlertDialog from './alert-dialog'
import { SearchResults } from './search-results'

type SearchPopperProps = {
	id: string | undefined
	anchorEl: HTMLDivElement | null
	onClose: () => void
	results: Product[]
	open: boolean
}

export function SearchPopper({
	id,
	anchorEl,
	onClose,
	results,
	open,
}: SearchPopperProps): JSX.Element {
	const { productStore } = useStore()
	const [openAlert, setOpenAlert] = useState(false)
	const [currentProduct, setCurrentProduct] = useState<Product | null>(
		productStore.currentProduct
	)

	const handleClickOpen = () => {
		setOpenAlert(true)
	}

	const handleClickClose = () => {
		setOpenAlert(false)
	}

	const onClick = (product: Product) => {
		if (!productStore.currentProduct) {
			productStore.setCurrent(product)
			return
		}
		if (product.code === productStore.currentProduct.code) {
			return
		}
		setCurrentProduct(() => product)
		handleClickOpen()
	}

	const onChangeProduct = (value: boolean) => {
		handleClickClose()
		if (!value || !currentProduct) {
			return
		}
		productStore.setCurrent(currentProduct)
	}

	return (
		<>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				disableAutoFocus={true}
				disableEnforceFocus={true}
				onClose={onClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				autoFocus={false}
			>
				<SearchResults results={results} onClick={onClick} />
			</Popover>
			<AlertDialog
				openAlert={openAlert}
				handleClickClose={handleClickClose}
				onChangeProduct={onChangeProduct}
			/>
		</>
	)
}
