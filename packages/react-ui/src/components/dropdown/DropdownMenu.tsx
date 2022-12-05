import React, { forwardRef, HTMLAttributes } from 'react'
import { cls } from '@olaf/utils/src'
import { UI_PREFIX } from '../../constants'
import './dropdown-menu.scss'

type DropdownMenuProps = HTMLAttributes<HTMLElement>

const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>((props, ref) => {
	const { className, children, ...rest } = props

	const prefixCls = `${UI_PREFIX}-dropdown-menu`

	return (
		<div ref={ref} className={cls(className, prefixCls)} {...rest}>
			{children}
		</div>
	)
})

export default DropdownMenu
