import { cls } from '@olaf/utils/src'
import React, { forwardRef, HTMLAttributes, ReactEventHandler, ReactNode, SyntheticEvent, useState } from 'react'
import { UI_PREFIX } from '../../constants'
import './avatar.scss'
import AvatarGroup from './avatarGroup'

interface AvatarProps extends HTMLAttributes<HTMLElement> {
	size?: 'small' | 'medium' | 'large'
	round?: boolean
	color?: string
	src?: string
	fallback?: ReactNode
	badge?: ReactNode
	onError?: ReactEventHandler<HTMLImageElement>
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
	const {
		children,
		className,
		size = 'medium',
		src,
		round = false,
		color = '#ccc',
		fallback,
		badge,
		style,
		onError,
		...rest
	} = props

	const prefixCls = `${UI_PREFIX}-avatar`

	const [error, setError] = useState<SyntheticEvent<HTMLImageElement, Event>>()
	const imgEle = error ? (
		fallback
	) : (
		<img
			className={`${prefixCls}-img`}
			src={src}
			onError={err => {
				onError?.(err)
				setError(err)
			}}
		/>
	)

	return (
		<div
			ref={ref}
			className={cls(className, prefixCls, `${prefixCls}-${size}`, {
				[`${prefixCls}-round`]: round
			})}
			style={{ ...style, backgroundColor: color }}
			{...rest}
		>
			{children || imgEle}
			{badge && <div className={`${prefixCls}-badge`}>{badge}</div>}
		</div>
	)
})

const ExportAvatar = Avatar as typeof Avatar & {
	Group: typeof AvatarGroup
}
ExportAvatar.Group = AvatarGroup

export default ExportAvatar
