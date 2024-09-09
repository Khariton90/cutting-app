import { ChangeEvent, useState } from 'react'
import styles from './form-details.module.css'
import { Detail } from './form-details'

type FieldsetDetailsProps = {
	detail: Detail
}

export function FieldsetDetails({ detail }: FieldsetDetailsProps): JSX.Element {
	const [field, setField] = useState<Detail>(detail)

	const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		setField(prev => ({ ...prev, [target.name]: parseInt(target.value) }))
	}
	return (
		<fieldset className={styles.fieldset}>
			<legend className={styles.legend}>#</legend>
			<input
				className={styles.input}
				type='number'
				name='width'
				tabIndex={1}
				value={field.width}
				onChange={handleChange}
			/>
			<input
				type='number'
				className={styles.input}
				name='height'
				tabIndex={2}
				value={field.height}
				onChange={handleChange}
			/>
		</fieldset>
	)
}
