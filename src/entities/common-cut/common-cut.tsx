import { CommonCut } from '@/shared/types'
import vertical from '@/shared/assets/icons/vertical.svg'
import horizontal from '@/shared/assets/icons/horizontal.svg'
import sixSection from '@/shared/assets/icons/sixSection.svg'
import cross from '@/shared/assets/icons/cross.svg'
import styles from './common-cut.module.css'

const Icons = {
	[CommonCut.Cross]: cross,
	[CommonCut.Horizontal]: horizontal,
	[CommonCut.SixSections]: sixSection,
	[CommonCut.Vertical]: vertical,
}

type CommonCutProps = {
	value: CommonCut
	onChange: (value: CommonCut) => void
}

export function CommonCutUi({ value, onChange }: CommonCutProps): JSX.Element {
	return (
		<label htmlFor={value}>
			<img
				className={styles.img}
				src={value !== CommonCut.Unknown ? Icons[value] : ''}
				alt={value}
			/>
			<input
				className='visually-hidden'
				type='radio'
				name='commonCuts'
				value={value}
				id={value}
				onChange={evt => onChange(evt.target.value as CommonCut)}
			/>
		</label>
	)
}
