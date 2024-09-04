import { getParent, types } from 'mobx-state-tree'
import { CutSheet } from './store.model'
import { Sheet } from '../../shared'

export const CutSheetStore = types
	.model('CutSheetStore', {
		currentSheet: types.maybeNull(CutSheet),
		cutSheetList: types.array(CutSheet),
	})
	.views(self => ({
		get parent() {
			return getParent(self)
		},
	}))
	.actions(self => ({
		addCurrent(sheet: Sheet | null) {
			self.currentSheet = sheet ? { ...sheet } : null
		},
		addToList(sheet: Sheet) {
			self.cutSheetList.push(sheet)
		},
	}))
