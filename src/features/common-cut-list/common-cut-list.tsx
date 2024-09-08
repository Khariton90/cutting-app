import { CommonCutUi } from '@/entities/common-cut'
import { CommonCut } from '@/shared/types'
import styles from './common-cut-list.module.css'

type CommonCutListProps = {
	onChangeCommon: (value: CommonCut) => void
}

export function CommonCutList({
	onChangeCommon,
}: CommonCutListProps): JSX.Element {
	const onChange = (value: CommonCut) => {
		onChangeCommon(value)
	}

	return (
		<form className={styles.form}>
			{Object.keys(CommonCut).map(value =>
				value !== CommonCut.Unknown ? (
					<CommonCutUi
						key={value}
						onChange={onChange}
						value={value as CommonCut}
					/>
				) : null
			)}
		</form>
	)
}
