import { Box } from '@mui/material'
import { ChangeEvent, useState } from 'react'

enum CommonCut {
	Horizontal = 'Horizontal',
	Vertical = 'Vertical',
	Cross = 'Cross',
	SixSections = 'SixSections',
}

export function CommonCuts(): JSX.Element {
	const [commonValue, setCommonValue] = useState<CommonCut | undefined>()

	const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setCommonValue(() => evt.target.value as CommonCut)
	}

	return (
		<Box sx={{ display: 'flex', gap: 2 }}>
			<form>
				<label htmlFor={CommonCut.Horizontal}>
					<span>horizontal</span>
					<input
						type='radio'
						name='commonCuts'
						value={CommonCut.Horizontal}
						id={CommonCut.Horizontal}
						onChange={handleChange}
					/>
				</label>
				<label htmlFor={CommonCut.Vertical}>
					<span>vertical</span>
					<input
						type='radio'
						name='commonCuts'
						value={CommonCut.Vertical}
						id={CommonCut.Vertical}
						onChange={handleChange}
					/>
				</label>
				<label htmlFor={CommonCut.Cross}>
					<span>cross</span>
					<input
						type='radio'
						name='commonCuts'
						value={CommonCut.Cross}
						id={CommonCut.Cross}
						onChange={handleChange}
					/>
				</label>
				<label htmlFor={CommonCut.SixSections}>
					<span>sixSections</span>
					<input
						type='radio'
						name='commonCuts'
						value={CommonCut.SixSections}
						id={CommonCut.SixSections}
						onChange={handleChange}
					/>
				</label>
			</form>
		</Box>
	)
}
