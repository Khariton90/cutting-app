import styles from './form-details.module.css'

export function FormDetails(): JSX.Element {
	return (
		<div className={styles.container}>
			<h2>Детали</h2>
			<form className={styles.formDetails}>
				<fieldset className={styles.fieldset}>
					<legend className={styles.legend}># 1</legend>
					<input
						className={styles.input}
						type='number'
						name='width'
						tabIndex={1}
					/>
					<input
						type='number'
						className={styles.input}
						name='height'
						tabIndex={2}
					/>
				</fieldset>
			</form>
		</div>
	)
}
