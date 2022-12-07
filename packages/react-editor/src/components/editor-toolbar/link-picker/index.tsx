import { useBoolean } from '@olaf/react-hook/src'
import { Button, Dropdown, Input, Popover, Space } from '@olaf/react-ui/src'
import { cls } from '@olaf/utils/src'
import { Editor } from '@tiptap/core'
import React, { useState } from 'react'
import { TbLink, TbX } from 'react-icons/tb'
import './index.scss'

export default ({ editor }: { editor: Editor }) => {
	const disabled = !editor.can().undo()
	const [visible, { setBool: setVisible, setFalse: hide, setReverse: toggle }] = useBoolean(false)
	const [href, setHref] = useState('')

	const unsetLink = () => {
		editor.chain().focus().extendMarkRange('link').unsetLink().run()
		setHref('')
		hide()
	}

	const setLink = () => {
		editor.chain().focus().extendMarkRange('link').setLink({ href }).run()
		setHref('')
		hide()
	}

	const isLink = editor.isActive('link')

	const contentEle = (
		<div className="g-link-popup">
			<div className="g-link-header">
				链接
				<div className="g-link-close">
					<TbX />
				</div>
			</div>
			<Input block placeholder="链接地址" value={href} onChange={val => setHref(val as string)} />
			<Space className="g-link-footer">
				{isLink && <Button onClick={unsetLink}>移除</Button>}
				<Button primary disabled={!href} onClick={setLink}>
					确定
				</Button>
			</Space>
		</div>
	)

	return (
		<Popover
			trigger="hover"
			open={visible}
			onVisibleChange={setVisible}
			placement="right-start"
			content={contentEle}
		>
			<Dropdown.Item
				icon={
					<div
						className={cls('g-link-picker', {
							active: isLink
						})}
					>
						<TbLink />
					</div>
				}
				onClick={() => {
					const previousUrl = editor.getAttributes('link').href ?? ''
					setHref(previousUrl)
					toggle()
				}}
			>
				链接
			</Dropdown.Item>
		</Popover>
	)
}
