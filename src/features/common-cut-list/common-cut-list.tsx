import { CommonCutUi } from '@/entities/common-cut'
import { CommonCut } from '@/shared/types'
import { Box } from '@mui/material'
import { useState } from 'react'

export function CommonCutList(): JSX.Element {
	const [, setCommonValue] = useState<CommonCut | undefined>()

	const onChange = (value: CommonCut) => {
		setCommonValue(() => value)
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
