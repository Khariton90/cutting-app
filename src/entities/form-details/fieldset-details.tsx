import { ChangeEvent, useState } from 'react'
import styles from './form-details.module.css'
import { Detail } from './form-details'
import { Button } from '@mui/material'

type FieldsetDetailsProps = {
	detail: Detail
	deleteDetail: (id: number) => void
}

export function FieldsetDetails({
	detail,
	deleteDetail,
}: FieldsetDetailsProps): JSX.Element {
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
			<Button type='button' onClick={() => deleteDetail(detail.id)}>
				Удалить
			</Button>
		</fieldset>
	)
}
