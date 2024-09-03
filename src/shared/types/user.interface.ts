import { Role } from './role.enum'

export interface User {
	id: number
	role: Role
	firstname: string
	lastname: string
}
