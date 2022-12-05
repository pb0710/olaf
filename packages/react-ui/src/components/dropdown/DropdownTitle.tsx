import React, { forwardRef, HTMLAttributes } from 'react'
import { cls } from '@olaf/utils/src'
import { UI_PREFIX } from '../../constants'
import './dropdown-title.scss'

type DropdownTitleProps = HTMLAttributes<HTMLElement>

const DropdownTitle = forwardRef<HTMLDivElement, DropdownTitleProps>((props, ref) => {
	const { className, children, ...rest } = props

	const prefixCls = `${UI_PREFIX}-dropdown-title`

	return (
		<div ref={ref} className={cls(className, prefixCls)} {...rest}>
			{children}
		</div>
	)
})

export default DropdownTitle
