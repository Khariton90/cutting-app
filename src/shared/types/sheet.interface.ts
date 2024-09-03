import { Product } from './product.interface'
import { Segment } from './segment.interface'

export interface Sheet {
	id: number
	qty: number
	product: Product
	segments: Segment[]
	createdAt: Date
	updatedAt: Date
}
