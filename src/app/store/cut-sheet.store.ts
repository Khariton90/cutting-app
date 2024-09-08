import { getParent, types } from 'mobx-state-tree'
import { CutSheet } from './store.model'
import { Sheet } from '@/shared/types'

export const CutSheetStore = types
	.model('CutSheetStore', {
		cutSheetList: types.array(CutSheet),
		selectedSheet: types.maybeNull(types.safeReference(CutSheet)),
	})
	.views(self => ({
		get parent() {
			return getParent(self)
		},
	}))
	.actions(self => ({
		addToList(sheet: Sheet) {
			self.cutSheetList.push(sheet)
		},
	}))
