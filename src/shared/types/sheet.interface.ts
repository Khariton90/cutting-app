// import { Product } from './product.interface'

import { Segment } from './segment.interface'

export interface Sheet {
	id: number
	qty: number
	width: number
	height: number
	//TODO product: Product
	segments?: Segment[]
}
