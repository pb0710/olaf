import { pick, pickDataAttrs } from '@olaf/utils/src'
import React, { Children, cloneElement, ComponentProps, forwardRef, ReactNode } from 'react'
import { UI_PREFIX } from '../../constants'
import Trigger, { EventsByTriggerNeed } from '../trigger'
import './popover.scss'

interface PopoverProps extends Omit<ComponentProps<typeof Trigger>, 'popup' | 'growTransformOrigin' | 'motion'> {
	content?: ReactNode
}

const Popover = forwardRef<HTMLElement, PopoverProps>((props, propRef) => {
	const {
		children,
		content,
		placement = 'bottom-start',
		open,
		defaultOpen,
		trigger,
		mouseEnterDelay,
		mouseLeaveDelay,
		spacing,
		crossOffset,
		disabled,
		unmountOnExit,
		appendTo,
		onClickOutside,
		onVisibleChange,
		...rest
	} = props

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

	const popup = <div className={`${prefixCls}-content`}>{content}</div>

	return (
		<Trigger
			ref={propRef}
			popup={popup}
			placement={placement}
			open={open}
			defaultOpen={defaultOpen}
			trigger={trigger}
			disabled={disabled}
			mouseEnterDelay={mouseEnterDelay}
			mouseLeaveDelay={mouseLeaveDelay}
			spacing={spacing}
			unmountOnExit={unmountOnExit}
			crossOffset={crossOffset}
			appendTo={appendTo}
			onClickOutside={onClickOutside}
			onVisibleChange={onVisibleChange}
			motion="grow"
			growTransformOrigin={growTransformOrigin}
		>
			{cloneElement(Children.only(children), {
				...pick(rest, ...EventsByTriggerNeed),
				...pickDataAttrs(rest)
			})}
		</Trigger>
	)
})
Popover.displayName = 'Popover'
export default Popover
