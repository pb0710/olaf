import React, { ComponentProps, FC, ReactNode } from 'react'
import { cls } from '@olaf/utils/src'
import { UI_PREFIX } from '../../constants'
import './dialog.scss'
import Modal from '../modal'
import Space from '../space'
import Button from '../button'
import Card from '../card'
import Motion from '../motion'
import { TbX } from 'react-icons/tb'

interface DialogProps extends ComponentProps<typeof Modal> {
	hasCancel?: boolean
	closeIcon?: ReactNode
	title?: string
	okText?: string
	cancelText?: string
	okLoading?: boolean
	onCancel?: () => void
	onOk?: () => void
}

const Dialog: FC<DialogProps> = props => {
	const prefixCls = `${UI_PREFIX}-dialog`
	const {
		children,
		className,
		open,
		maskClassName,
		maskClosable,
		hasCancel = true,
		title,
		okText = 'Ok',
		cancelText = 'Cancel',
		okLoading = false,
		onCancel,
		onOk,
		closeIcon = <TbX className={`${prefixCls}-header-close-icon`} onClick={onCancel} />,
		...rest
	} = props

	return (
		<Modal open={open} maskClassName={maskClassName} maskClosable={maskClosable} onCancel={onCancel} {...rest}>
			<Motion.Zoom in={open}>
				<Card
					className={cls(className, prefixCls)}
					shadow
					bordered={false}
					header={
						<div className={`${prefixCls}-header`}>
							<strong className={`${prefixCls}-header-title`}>{title}</strong>
							{closeIcon}
						</div>
					}
					footer={
						<div className={`${prefixCls}-footer`}>
							<Space>
								{hasCancel && <Button onClick={onCancel}>{cancelText}</Button>}
								<Button primary loading={okLoading} onClick={onOk}>
									{okText}
								</Button>
							</Space>
						</div>
					}
				>
					<div className={`${prefixCls}-content`}>{children}</div>
				</Card>
			</Motion.Zoom>
		</Modal>
	)
}

export default Dialog
