import React, { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import { cls } from '@olaf/utils/src'
import './button.scss'
import Loading from '../loading'
import { UI_PREFIX } from '../../constants'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	size?: 'small' | 'medium' | 'large'
	primary?: boolean
	round?: boolean
	circle?: boolean
	square?: boolean
	loading?: boolean
	disabled?: boolean
	icon?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const {
		children,
		className,
		type = 'button',
		size = 'medium',
		primary = false,
		round = false,
		circle = false,
		square = false,
		loading = false,
		disabled = false,
		icon = null,
		...rest
	} = props

	const prefixCls = `${UI_PREFIX}-button`
	const loadingEle = <Loading size="inherit" style={{ color: 'inherit' }} />

	const renderContentEle = () => {
		if (loading) {
			if (circle || square) {
				return loadingEle
			}
			return (
				<>
					{loadingEle}
					<span className="g-button-inner-ml">{children}</span>
				</>
			)
		}

		if (icon) {
			return (
				<>
					{icon}
					<span className="g-button-inner-ml">{children}</span>
				</>
			)
		}
		return circle || square ? children : <span>{children}</span>
	}

	return (
		<button
			className={cls(className, prefixCls, `${prefixCls}-${size}`, {
				[`${prefixCls}-primary`]: primary,
				[`${prefixCls}-round`]: round,
				[`${prefixCls}-circle`]: circle,
				[`${prefixCls}-square`]: square,
				[`${prefixCls}-disabled`]: disabled || loading
			})}
			ref={ref}
			type={type}
			{...rest}
		>
			{renderContentEle()}
		</button>
	)
})
Button.displayName = 'Button'
export default Button
