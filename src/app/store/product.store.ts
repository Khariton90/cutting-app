import { getParent, types } from 'mobx-state-tree'
import { ProductItem } from './store.model'
import { Product } from '../../shared'

export const ProductStore = types
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
			self.currentProduct = { ...product }
		},
	}))
