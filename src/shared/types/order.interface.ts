import { OrderStatus } from './order-status.enum'
import { Sheet } from './sheet.interface'

export interface Order {
	id: number
	title: string
	sheetList: Sheet[]
	comment: string
	author: string
	status: OrderStatus
	createdAt: Date
	updatedAt: Date
}
