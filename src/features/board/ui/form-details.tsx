import styles from './board.module.css'
// import { useStore } from '../../../shared/libs'

export function FormDetails(): JSX.Element {
	// const { sheetStore } = useStore()

	return (
		<div className={styles.boardSheetList}>
			<h2>Детали</h2>
			<form className={styles.formDetails}>
				<fieldset className='fieldset'>
					<legend>#</legend>
					<input
						className='base-Input-input'
						type='number'
						name='width'
						tabIndex={1}
					/>
					<input
						type='number'
						className='base-Input-input'
						name='height'
						tabIndex={2}
					/>
				</fieldset>
			</form>
		</div>
	)
}
