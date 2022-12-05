import React, { forwardRef, HTMLAttributes } from 'react'
import { cls } from '@olaf/utils/src'
import { UI_PREFIX } from '../../constants'
import './tag.scss'
// import Icon from '../icon'
// import { mdiClose, mdiLoading } from '@mdi/js'
import { useBoolean } from '@olaf/react-hook/src'

interface TagProps extends HTMLAttributes<HTMLDivElement> {
	size?: 'small' | 'medium' | 'large'
	round?: boolean
	bordered?: boolean
	bgColor?: string
	color?: string
	borderColor?: string
	closable?: boolean
	onClose?: () => void | Promise<void>
}

const Tag = forwardRef<HTMLDivElement, TagProps>((props, outerRef) => {
	const {
		children,
		className,
		size = 'medium',
		round = false,
		bgColor,
		color,
		bordered = false,
		borderColor,
		closable = false,
		onClose,
		style,
		...rest
	} = props

	const [loading, { setTrue: showLoading, setFalse: hideLoading }] = useBoolean(false)

	const prefixCls = `${UI_PREFIX}-tag`

	return (
		<div
			ref={outerRef}
			className={cls(className, prefixCls, `${prefixCls}-${size}`, {
				[`${prefixCls}-round`]: round,
				[`${prefixCls}-bordered`]: bordered
			})}
			style={{
				...style,
				color,
				borderColor,
				backgroundColor: bgColor
			}}
			{...rest}
		>
			<div>{children}</div>
			{closable && (
				<div className={`${prefixCls}-close`}>
					{/* {loading ? (
						<Icon path={mdiLoading} spin={1} />
					) : (
						<Icon
							path={mdiClose}
							onClick={() => {
								const res = onClose?.()
								if (res instanceof Promise) {
									showLoading()
									res.then(() => {
										hideLoading()
									})
								}
							}}
						/>
					)} */}
				</div>
			)}
		</div>
	)
})

export default Tag
