import { cls } from '@olaf/utils/src'
import React, { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { UI_PREFIX } from '../../constants'
import './list-item.scss'

interface ListItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'prefix'> {
	prefix?: ReactNode
	suffix?: ReactNode
	size?: 'small' | 'medium' | 'large'
	bordered?: boolean
}

const ListItem = forwardRef<HTMLDivElement, ListItemProps>((props, propRef) => {
	const { className, children, size = 'medium', bordered = true, prefix, suffix, ...rest } = props

	const prefixCls = `${UI_PREFIX}-list-item`

	return (
		<div
			ref={propRef}
			className={cls(className, prefixCls, `${prefixCls}-${size}`, {
				[`${prefixCls}-bordered`]: bordered
			})}
			{...rest}
		>
			{prefix && <div className="g-list-item-mr">{prefix}</div>}
			<div className={`${prefixCls}-content`}>{children}</div>
			{suffix && <div className="g-list-item-ml">{suffix}</div>}
		</div>
	)
})
ListItem.displayName = 'ListItem'

export default ListItem
