import React, { forwardRef } from 'react'
import DropdownMenu from './DropdownMenu'
import DropdownItem from './DropdownItem'
import DropdownTitle from './DropdownTitle'
import DropdownDivider from './DropdownDivider'
import Trigger, { TriggerProps } from '../trigger'

interface DropdownProps extends TriggerProps {
	overlayClassName?: string // FIXME: useless
}

const Dropdown = forwardRef<HTMLElement, DropdownProps>((props, outerRef) => {
	const { children, content, spacing = 4, ...rest } = props

	return (
		<Trigger ref={outerRef} content={content} spacing={spacing} motion="stretch" {...rest}>
			{children}
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
