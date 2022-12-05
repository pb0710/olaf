import { cls } from '@olaf/utils/src'
import React, { forwardRef } from 'react'
import { UI_PREFIX } from '../../constants'
import Trigger, { TriggerProps } from '../trigger'
import './tooltip.scss'

interface TooltipProps extends TriggerProps {
	light?: boolean
}

const Tooltip = forwardRef<HTMLElement, TooltipProps>((props, outerRef) => {
	const { children, content, light = false, placement = 'top', ...rest } = props

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
	const prefixCls = `${UI_PREFIX}-tooltip`

	const contentEle = (
		<div className={cls(`${prefixCls}-content`, `${prefixCls}-content-${light ? 'light' : 'dark'}`)}>{content}</div>
	)

	return (
		<Trigger
			ref={outerRef}
			content={contentEle}
			placement={placement}
			motion="grow"
			growTransformOrigin={growTransformOrigin}
			unmountOnExit={false}
			{...rest}
		>
			{children}
		</Trigger>
	)
})
Tooltip.displayName = 'Tooltip'
export default Tooltip
