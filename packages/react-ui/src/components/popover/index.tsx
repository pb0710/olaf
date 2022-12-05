import React, { forwardRef } from 'react'
import { UI_PREFIX } from '../../constants'
import Trigger, { TriggerProps } from '../trigger'
import './popover.scss'

interface PopoverProps extends TriggerProps {
	contentStyle?: CSSStyleSheet
}

const Popover = forwardRef<HTMLElement, PopoverProps>((props, outerRef) => {
	const { children, contentStyle = {}, content, placement = 'bottom-start', ...rest } = props

	const originMap = {
		'top-start': 'bottom left',
		top: 'bottom',
		'top-end': 'bottom right',
		'bottom-start': 'top left',
		bottom: 'top',
		'bottom-end': 'top right',
		'left-start': 'top right',
		left: 'right',
		'left-end': 'bottom right',
		'right-start': 'top left',
		right: 'left',
		'right-end': 'bottom left'
	}
	const growTransformOrigin = originMap[placement]
	const prefixCls = `${UI_PREFIX}-popover`

	const contentEle = (
		<div className={`${prefixCls}-content`} style={contentStyle}>
			{content}
		</div>
	)

	return (
		<Trigger
			ref={outerRef}
			content={contentEle}
			placement={placement}
			motion="grow"
			growTransformOrigin={growTransformOrigin}
			{...rest}
		>
			{children}
		</Trigger>
	)
})
Popover.displayName = 'Popover'
export default Popover
