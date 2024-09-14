import { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app/index.tsx'
import RootStore, { RootStoreType } from './app/store'

const store: RootStoreType = RootStore.create({})
export const StoreContext = createContext(store)

ReactDOM.createRoot(document.getElementById('root')!).render(
	<StoreContext.Provider value={store}>
		<App />
	</StoreContext.Provider>
)
