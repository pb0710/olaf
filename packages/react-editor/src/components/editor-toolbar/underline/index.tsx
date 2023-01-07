import { Tooltip } from '@olaf/react-ui/src'
import { cls } from '@olaf/utils/src'
import { Editor } from '@tiptap/core'
import React from 'react'
import { AiOutlineUnderline } from 'react-icons/ai'
import './index.scss'

export default function Underline({ editor }: { editor: Editor }) {
	return (
		<Tooltip placement="bottom" title="下划线">
			<div
				className={cls('g-underline-icon', {
					active: editor.isActive('underline'),
					disabled: !editor.can().toggleUnderline()
				})}
				onClick={() => {
					editor.chain().focus().toggleUnderline().run()
				}}
			>
				<AiOutlineUnderline />
			</div>
		</Tooltip>
	)
}
