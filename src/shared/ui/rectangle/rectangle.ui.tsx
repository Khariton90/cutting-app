import { Graphics } from 'pixi.js'
import { Container, PixiComponent } from '@pixi/react'
import { ReactNode } from 'react'
import { RectangleProps } from './rectangle.model'

const PixiRectangle = PixiComponent<RectangleProps, Graphics>('Rectangle', {
	create: () => new Graphics(),
	applyProps: (ins, _, props) => {
		ins.x = props.x
		ins.beginFill(props.color)
		ins.lineStyle(2, 'blue')
		ins.drawRect(0, 0, props.width, props.height)
		ins.endFill()
	},
})

interface RectangleUiProps extends RectangleProps {
	children?: ReactNode
}

export function RectangleUi(props: RectangleUiProps): JSX.Element {
	const { children, x, y, width, height } = props
	console.log(x)
	return (
		<Container x={x} y={y} width={width} height={height}>
			<PixiRectangle
				x={0}
				y={0}
				color={props.color}
				id={props.id}
				width={props.width}
				height={props.height}
			/>
			{children}
		</Container>
	)
}
