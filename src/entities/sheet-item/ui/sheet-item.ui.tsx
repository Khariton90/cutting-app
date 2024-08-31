import { observer } from 'mobx-react-lite'
import { RectangleUi, RectangleProps } from '../../../shared/ui/rectangle'

type SheetItemProps = {
	rectangle: RectangleProps
	cutList: RectangleProps[]
}

export function SheetItemUi({
	rectangle,
	cutList,
}: SheetItemProps): JSX.Element {
	return (
		<RectangleUi {...rectangle}>
			{cutList.length ? cutList.map(item => <RectangleUi {...item} />) : null}
		</RectangleUi>
	)
}

export const SheetItem = observer(SheetItemUi)
