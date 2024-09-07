import { types, Instance } from 'mobx-state-tree'
import { products } from '@/shared'
import { ProductStore } from './product.store'
import { CutSheetStore } from './cut-sheet.store'

const RootStore = types.model('RootStore', {
	sheetStore: types.optional(CutSheetStore, {
		currentSheet: null,
		cutSheetList: [],
	}),
	productStore: types.optional(ProductStore, {
		products: products,
		currentProduct: null,
	}),
})

export type RootStoreType = Instance<typeof RootStore>
export default RootStore
