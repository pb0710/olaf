import { cls } from '@olaf/utils/src'
import React, { forwardRef, HTMLAttributes, ReactNode } from 'react'
import SpinSvg from './SpinSvg'
import './loading.scss'
import { UI_PREFIX } from '../../constants'

interface LoadingProps extends HTMLAttributes<HTMLElement> {
	spinning?: boolean
	size?: 'inherit' | 'small' | 'medium' | 'large'
	icon?: ReactNode
	description?: ReactNode
}

const Loading = forwardRef<HTMLDivElement, LoadingProps>((props, propRef) => {
	const { className, children, spinning = true, size = 'medium', icon = <SpinSvg />, description, ...rest } = props

	const isWrapper = Boolean(children)

	const prefixCls = `${UI_PREFIX}-loading`

	return (
		<div
			ref={propRef}
			className={cls(className, prefixCls, {
				[`${prefixCls}-spinning`]: spinning,
				[`${prefixCls}-is-wrapper`]: isWrapper,
				[`${prefixCls}-${size}`]: size
			})}
			{...rest}
		>
			<div className={`${prefixCls}-content`}>{children}</div>
			{spinning && (
				<div className={`${prefixCls}-layer`}>
					{icon}
					{description && <span className={`${prefixCls}-description`}>{description}</span>}
				</div>
			)}
		</div>
	)
})
Loading.displayName = 'Loading'
export default Loading
