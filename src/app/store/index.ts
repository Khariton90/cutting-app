import { types, Instance, getParent } from 'mobx-state-tree'
import { CutSheet } from './store.model'

const state = {
	cut: {
		id: 'id' + new Date().getTime(),
		x: 75,
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
	}))

const RootStore = types.model('RootStore', {
	sheetStore: types.optional(CutSheetStore, {}),
})

export type RootStoreType = Instance<typeof RootStore>
export default RootStore
