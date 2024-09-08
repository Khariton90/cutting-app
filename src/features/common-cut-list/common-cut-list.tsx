import { CommonCutUi } from '@/entities/common-cut'
import { CommonCut } from '@/shared/types'
import { Box } from '@mui/material'

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
		<Box sx={{ display: 'flex', gap: 2 }}>
			<form className='common-cuts'>
				{Object.keys(CommonCut).map(value => (
					<CommonCutUi
						key={value}
						onChange={onChange}
						value={value as CommonCut}
					/>
				))}
			</form>
		</Box>
	)
}
