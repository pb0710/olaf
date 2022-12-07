import { Tooltip } from '@olaf/react-ui/src'
import { cls } from '@olaf/utils/src'
import { Editor } from '@tiptap/core'
import React from 'react'
import { TbItalic } from 'react-icons/tb'
import './index.scss'

export default ({ editor }: { editor: Editor }) => {
	return (
		<Tooltip placement="bottom" title="斜体">
			<div
				className={cls('g-italic-icon', {
					active: editor.isActive('italic')
				})}
				onClick={() => {
					editor.chain().focus().toggleItalic().run()
				}}
			>
				<TbItalic />
			</div>
		</Tooltip>
	)
}
