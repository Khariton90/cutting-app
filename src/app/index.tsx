import './global.css'
import { Board } from '../features/board'
import { observer } from 'mobx-react-lite'
import { Header } from '../shared/ui/header'
import { Nav } from '../shared/ui/nav'
import { Aside } from '../widgets/aside'
import { useStore } from '../shared/libs'
import { useEffect } from 'react'

function Main(): JSX.Element {
	const { sheetStore } = useStore()

	useEffect(() => {
		sheetStore.init()
	}, [])

	return (
		<div className='app'>
			<Header />
			<Nav />
			<Board />
			<Aside />
			<footer className='footer'>footer</footer>
		</div>
	)
}

export const App = observer(Main)
