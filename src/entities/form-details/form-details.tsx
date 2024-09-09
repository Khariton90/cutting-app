import { ChangeEvent, useState } from 'react'
import styles from './form-details.module.css'
import { FieldsetDetails } from './fieldset-details'
import { setIdNumber } from '@/shared/libs'

export type Detail = {
	id: number
	width: number
	height: number
	isCompleted: boolean
}

export type Field = Omit<Detail, 'id' | 'isCompleted'>

export function FormDetails(): JSX.Element {
	const [details, setDetails] = useState<Detail[]>([])
	const [fieldItem, setFieldItem] = useState<Field>({
		width: 0,
		height: 0,
	})

	const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		setFieldItem(prev => ({ ...prev, [target.name]: parseInt(target.value) }))
	}

	const createDetail = () => {
		if (!fieldItem.height || !fieldItem.width) {
			return
		}
		const newItem = { ...fieldItem, id: setIdNumber(), isCompleted: false }
		setDetails(prev => [...prev, newItem])
		setFieldItem(() => ({
			width: 0,
			height: 0,
		}))
	}

	const deleteDetail = (id: number) => {
		setDetails(prev => prev.filter(item => item.id !== id))
	}

	return (
		<div className={styles.container}>
			<h2>Детали</h2>
			<form className={styles.formDetails}>
				{details.map(item => (
					<FieldsetDetails
						key={item.id}
						detail={item}
						deleteDetail={deleteDetail}
					/>
				))}

				<fieldset className={styles.fieldset} onBlur={createDetail}>
					<legend className={styles.legend}>#</legend>
					<input
						className={styles.input}
						type={fieldItem.height ? 'number' : 'text'}
						name='width'
						tabIndex={1}
						value={fieldItem.width || ' '}
						onChange={handleChange}
					/>
					<input
						type={fieldItem.height ? 'number' : 'text'}
						className={styles.input}
						name='height'
						tabIndex={2}
						value={fieldItem.height || ' '}
						onChange={handleChange}
					/>
				</fieldset>
			</form>
		</div>
	)
}
