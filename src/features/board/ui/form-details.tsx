import { ChangeEvent, useState } from 'react'
import styles from './board.module.css'
import { Size } from '../../../shared'
import { useStore } from '../../../shared/libs'

export function FormDetails(): JSX.Element {
	const { sheetStore } = useStore()

	const [cutList, setCutList] = useState<Size[]>([])
	const [form, setForm] = useState<Size>({
		id: 'id' + new Date().getTime(),
		width: 0,
		height: 0,
	})

	const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setForm(prevForm => ({
			...prevForm,
			[evt.target.name]: parseInt(evt.target.value),
		}))
	}

	const onBLur = () => {
		if (form.height && form.width) {
			setCutList(prev => [...prev, form])
			sheetStore.addSegment(form)
			setForm(() => ({
				id: 'id' + new Date().getTime(),
				width: 0,
				height: 0,
			}))
		}
	}

	return (
		<div className={styles.boardSheetList}>
			<h2>Детали</h2>
			<form className={styles.formDetails} onBlur={onBLur}>
				{cutList.map(item => (
					<fieldset className='fieldset' key={item.id}>
						<legend>#</legend>
						<input
							className='base-Input-input'
							type='number'
							name='width'
							defaultValue={item.width}
						/>
						<input
							type='number'
							className='base-Input-input'
							name='height'
							defaultValue={item.height}
						/>
					</fieldset>
				))}

				<fieldset className='fieldset'>
					<legend>#</legend>
					<input
						className='base-Input-input'
						type='number'
						name='width'
						value={form.width || ''}
						onChange={handleChange}
						tabIndex={1}
					/>
					<input
						type='number'
						className='base-Input-input'
						name='height'
						value={form.height || ''}
						onChange={handleChange}
						tabIndex={2}
					/>
				</fieldset>
			</form>
		</div>
	)
}
