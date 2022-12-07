import React, { Children, cloneElement, forwardRef, ReactNode } from 'react'
import DropdownMenu from './DropdownMenu'
import DropdownItem from './DropdownItem'
import DropdownTitle from './DropdownTitle'
import DropdownDivider from './DropdownDivider'
import Trigger, { EventsByTriggerNeed, TriggerProps } from '../trigger'
import { pick, pickDataAttrs } from '@olaf/utils/src'

interface DropdownProps extends Omit<TriggerProps, 'popup' | 'growTransformOrigin' | 'motion'> {
	content?: ReactNode
}

const Dropdown = forwardRef<HTMLElement, DropdownProps>((props, propRef) => {
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
		disabled,
		unmountOnExit,
		offsetX,
		offsetY,
		appendTo,
		onClickOutside,
		onVisibleChange,
		...rest
	} = props

	return (
		<Trigger
			ref={propRef}
			popup={content}
			placement={placement}
			open={open}
			defaultOpen={defaultOpen}
			trigger={trigger}
			disabled={disabled}
			mouseEnterDelay={mouseEnterDelay}
			mouseLeaveDelay={mouseLeaveDelay}
			spacing={spacing}
			unmountOnExit={unmountOnExit}
			offsetX={offsetX}
			offsetY={offsetY}
			appendTo={appendTo}
			onClickOutside={onClickOutside}
			onVisibleChange={onVisibleChange}
			motion="stretch"
		>
			{cloneElement(Children.only(children), {
				...pick(rest, ...EventsByTriggerNeed),
				...pickDataAttrs(rest)
			})}
		</Trigger>
	)
})
Dropdown.displayName = 'Dropdown'

const ExportDropdown = Dropdown as typeof Dropdown & {
	Menu: typeof DropdownMenu
	Item: typeof DropdownItem
	Title: typeof DropdownTitle
	Divider: typeof DropdownDivider
}
ExportDropdown.Menu = DropdownMenu
ExportDropdown.Item = DropdownItem
ExportDropdown.Title = DropdownTitle
ExportDropdown.Divider = DropdownDivider

export default ExportDropdown
