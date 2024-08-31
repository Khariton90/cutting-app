import { types, Instance, getParent } from 'mobx-state-tree'
import { CutSheet } from './store.model'
import { RectangleProps, Size } from '../../shared'

const state = {
	cut: {
		id: 'id' + new Date().getTime(),
		x: 150,
		y: 175,
		width: 500,
		height: 250,
		qty: 1,
		segments: [],
	},
}

const CutSheetStore = types
	.model('CutSheetStore', {
		cutSheetList: types.array(CutSheet),
	})
	.views(self => ({
		get parent() {
			return getParent(self)
		},
	}))
	.actions(self => ({
		init() {
			self.cutSheetList.push(state.cut)
		},
		addSegment(segment: Size) {
			const cut: RectangleProps = {
				...segment,
				x: 0,
				y: 0,
				color: 'gold',
			}
			const length = self.cutSheetList[0].segments.length
			console.log(length)
			if (length) {
				cut.x =
					self.cutSheetList[0].segments[length - 1].x +
					self.cutSheetList[0].segments[length - 1].width
				cut.y = self.cutSheetList[0].segments[length - 1].y
			}

			self.cutSheetList[0].segments.push(cut)
		},
	}))

const RootStore = types.model('RootStore', {
	sheetStore: types.optional(CutSheetStore, {}),
})

export type RootStoreType = Instance<typeof RootStore>
export default RootStore
