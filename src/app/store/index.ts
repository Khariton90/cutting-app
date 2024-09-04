import { types, Instance, getParent } from 'mobx-state-tree'
import { CutSheet, ProductItem } from './store.model'
import { products } from '../../shared/mocks/products'
import { Product } from '../../shared'

const CutSheetStore = types
	.model('CutSheetStore', {
		cutSheetList: types.array(CutSheet),
	})
	.views(self => ({
		get parent() {
			return getParent(self)
		},
	}))

const ProductStore = types
	.model('ProductStore', {
		products: types.array(ProductItem),
		currentProduct: types.maybeNull(ProductItem),
	})
	.views(self => ({
		get parent() {
			return getParent(self)
		},
	}))
	.actions(self => ({
		setCurrent(product: Product) {
			console.log(product)
			self.currentProduct = { ...product }
		},
	}))

const RootStore = types.model('RootStore', {
	sheetStore: types.optional(CutSheetStore, {}),
	productStore: types.optional(ProductStore, {
		products: products,
		currentProduct: null,
	}),
})

export type RootStoreType = Instance<typeof RootStore>
export default RootStore
