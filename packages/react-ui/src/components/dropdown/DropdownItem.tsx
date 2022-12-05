import React, { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { cls } from '@olaf/utils/src'
import { UI_PREFIX } from '../../constants'
import './dropdown-item.scss'

interface DropdownItemProps extends HTMLAttributes<HTMLElement> {
	icon?: ReactNode
	active?: boolean
}

const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>((props, ref) => {
	const { className, children, icon = null, active = false, ...rest } = props

	const prefixCls = `${UI_PREFIX}-dropdown-item`

	return (
		<div
			ref={ref}
			className={cls(className, prefixCls, {
				[`${prefixCls}-with-icon`]: Boolean(icon),
				[`${prefixCls}-active`]: active
			})}
			{...rest}
		>
			{icon && <div className={`${prefixCls}-icon-wrap`}>{icon}</div>}
			{children}
		</div>
	)
})

export default DropdownItem
