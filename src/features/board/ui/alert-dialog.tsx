import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

type AlertDialogProps = {
	openAlert: boolean
	handleClickClose: () => void
	onChangeProduct: (value: boolean) => void
}

export default function AlertDialog({
	openAlert,
	handleClickClose,
	onChangeProduct,
}: AlertDialogProps) {
	return (
		<Dialog
			open={openAlert}
			onClose={handleClickClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title'>Замена листа распила</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>
					При замене продукта для распила все несохраненные изменения будут
					утеряны. Хотите продолжить?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => onChangeProduct(false)}>Отмена</Button>
				<Button onClick={() => onChangeProduct(true)} autoFocus>
					Продолжить
				</Button>
			</DialogActions>
		</Dialog>
	)
}
