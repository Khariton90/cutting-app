import { getParent, types } from 'mobx-state-tree'

export const Cut = types.model('Cut', {
	id: types.string,
	x: types.number,
	y: types.number,
	width: types.number,
	height: types.number,
	color: types.string,
})

export const CutSheet = types
	.model('CutSheet', {
		id: types.identifier,
		x: types.number,
		y: types.number,
		width: types.number,
		height: types.number,
		qty: types.number,
		segments: types.array(Cut),
	})
	.views(self => ({
		get parent() {
			return getParent(self)
		},
	}))
