import { useContext } from 'react'
import { StoreContext } from '../../main'

export function useStore() {
	return useContext(StoreContext)
}
