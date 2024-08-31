import { Stage, TilingSprite } from '@pixi/react'
import { SheetItem } from '../../../entities/sheet-item'
import { useStore } from '../../../shared/libs'
import { observer } from 'mobx-react-lite'
import BoardHeader from './board-header'
import styles from './board.module.css'

const SHEET_COLOR = 'rgba(255,255,255,0.1)'
const Sizes = {
	width: 800,
	height: 600,
}

export function BoardUi(): JSX.Element {
	const {
		sheetStore: { cutSheetList },
	} = useStore()

	return (
		<main className='main'>
			<div className={styles.container}>
				<BoardHeader />

				<div className={styles.boardSheetList}>
					<h2>Листы</h2>
					<div className='sheetItem'></div>
				</div>
				<Stage
					style={{ border: '2px solid #888' }}
					width={Sizes.width}
					height={Sizes.height}
					options={{ background: '#ccc' }}
				>
					<TilingSprite
						image={
							'https://avatars.mds.yandex.net/i?id=a368708bd86e73fff0d44f5a23063326_l-5236397-images-thumbs&n=13'
						}
						width={Sizes.width}
						height={Sizes.height}
						tilePosition={{ x: 0, y: -3 }}
						tileScale={{ x: 0.6, y: 0.7 }}
					/>

					{cutSheetList.length &&
						cutSheetList.map(item => (
							<SheetItem
								key={item.id}
								rectangle={{
									id: item.id,
									x: item.x,
									y: item.y,
									width: item.width,
									height: item.height,
									color: SHEET_COLOR,
								}}
								cutList={item.segments}
							/>
						))}
				</Stage>
			</div>
		</main>
	)
}

export const Board = observer(BoardUi)
