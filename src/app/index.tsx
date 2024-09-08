import { Board } from '@/features/board'
import { observer } from 'mobx-react-lite'
import { Header } from '@/shared/ui/header'
import { Nav } from '@/shared/ui/nav'
import { Aside } from '@/widgets/aside'
import { Footer } from '@/shared/ui/footer'
import './global.css'

function Main(): JSX.Element {
	return (
		<div className='app'>
			<Header />
			<Nav />
			<Board />
			<Aside />
			<Footer />
		</div>
	)
}

export const App = observer(Main)
