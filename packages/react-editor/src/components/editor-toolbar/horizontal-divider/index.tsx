import { Dropdown } from '@olaf/react-ui/src'
import { cls } from '@olaf/utils/src'
import { Editor } from '@tiptap/core'
import React from 'react'
import { TbBorderStyle2 } from 'react-icons/tb'
import './index.scss'

export default function HorizontalDivider({ editor }: { editor: Editor }) {
	const disabled = !editor.can().setHorizontalRule()
	return (
		<Dropdown.Item
			icon={
				<div
					className={cls('g-horizontal-divider', {
						disabled
					})}
				>
					<TbBorderStyle2 />
				</div>
			}
			onClick={() => {
				if (disabled) return
				editor.chain().focus().setHorizontalRule().run()
			}}
		>
			分割线
		</Dropdown.Item>
	)
}
