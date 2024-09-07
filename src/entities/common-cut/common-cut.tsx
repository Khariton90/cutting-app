import { CommonCut } from '@/shared/types'

type CommonCutProps = {
	value: CommonCut
	onChange: (value: CommonCut) => void
}

export function CommonCutUi({ value, onChange }: CommonCutProps): JSX.Element {
	return (
		<label htmlFor={value}>
			<span>{value}</span>
			<input
				type='radio'
				name='commonCuts'
				value={value}
				id={value}
				onChange={evt => onChange(evt.target.value as CommonCut)}
			/>
		</label>
	)
}
