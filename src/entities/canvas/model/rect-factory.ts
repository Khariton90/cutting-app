import { Rect } from 'fabric'
import { CreateRect } from './sheet-factory'

export class RectFactory<T> {
	public list: T[] = []
	public create({ top, left, width, height, fill, stroke }: CreateRect) {
		const rect = new Rect({
			top,
			left,
			width,
			height,
			fill,
			stroke,
		})

		this.stopDrag(rect)
		return rect
	}

	private stopDrag(element: Rect) {
		element.lockMovementX = true
		element.lockMovementY = true
		element.lockScalingX = true
		element.lockScalingY = true
	}
}
