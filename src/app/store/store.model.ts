import { types } from 'mobx-state-tree'

export const Cut = types.model('Cut', {
	id: types.identifierNumber,
	x: types.number,
	y: types.number,
	width: types.number,
	height: types.number,
	color: types.string,
})

export const ProductItem = types.model('ProductItem', {
	id: types.identifierNumber,
	code: types.number,
	title: types.string,
	width: types.number,
	height: types.number,
	depth: types.number,
})

export const CutSheet = types.model('CutSheet', {
	id: types.identifierNumber,
	qty: types.number,
	width: types.number,
	height: types.number,
	// product: ProductItem,
	// segments: types.array(Cut),
})
