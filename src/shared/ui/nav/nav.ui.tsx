import MenuIcon from '@mui/icons-material/Menu'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import TuneIcon from '@mui/icons-material/Tune'
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion'
import PrintIcon from '@mui/icons-material/Print'

export function Nav(): JSX.Element {
	return (
		<nav className='nav'>
			<ul className='nav-list'>
				<li className='nav-item'>
					<MenuIcon />
					Меню
				</li>
				<li className='nav-item'>
					<SaveAsIcon />
					Сохранить
				</li>
				<li className='nav-item'>
					<TuneIcon />
					Параметры
				</li>
				<li className='nav-item'>
					<AutoAwesomeMotionIcon />
					Детали
				</li>
				<li className='nav-item'>
					<PrintIcon />
					Печать
				</li>
			</ul>
		</nav>
	)
}
