import { cls, is, omit } from '@olaf/utils/src'
import React, { ComponentProps, forwardRef, ReactNode, useEffect, useRef } from 'react'
import CountUp from 'react-countup'
import { RenderCounterProps } from 'react-countup/build/types'
import { UI_PREFIX } from '../../constants'
import Circle from './Circle'
import './progress-circle.scss'

interface ProgressProps extends ComponentProps<typeof Circle> {
	size?: 'small' | 'medium' | 'large'
	defaultMolecule?: number
	molecule?: number
	denominator?: number
	suffix?: ReactNode
	format?: ((props: RenderCounterProps) => ReactNode) | null
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>((props, propRef) => {
	const {
		className,
		size = 'medium',
		suffix = '%',
		format,
		defaultMolecule = 0,
		molecule = 0,
		denominator = 100,
		...rest
	} = omit(props, 'duration')

	const preMoleculeRef = useRef(defaultMolecule)
	useEffect(() => {
		preMoleculeRef.current = molecule
	}, [molecule])

	const detailVisible = size === 'small' || is.null(format)
	const prefixCls = `${UI_PREFIX}-progress-circle`

	return (
		<Circle
			ref={propRef}
			className={cls(className, prefixCls, `${prefixCls}-${size}`)}
			defaultMolecule={defaultMolecule}
			molecule={molecule}
			denominator={denominator}
			size={size}
			{...rest}
		>
			{detailVisible || (
				<div className={`${prefixCls}-detail`}>
					<CountUp
						className={`${prefixCls}-detail-num`}
						start={preMoleculeRef.current}
						end={molecule}
						// duration={0.4}
					>
						{format}
					</CountUp>
					{suffix && <span className={`${prefixCls}-detail-suffix`}>{suffix}</span>}
				</div>
			)}
		</Circle>
	)
})

export default Progress
