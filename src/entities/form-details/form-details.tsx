import styles from './form-details.module.css'

export function FormDetails(): JSX.Element {
	return (
		<div className={styles.container}>
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
