import { Tooltip } from '@olaf/react-ui/src'
import { cls } from '@olaf/utils/src'
import { Editor } from '@tiptap/core'
import React from 'react'
import { TbStrikethrough } from 'react-icons/tb'
import './index.scss'

export default ({ editor }: { editor: Editor }) => {
	return (
		<Tooltip placement="bottom" content="删除线">
			<div
				className={cls('g-strike-icon', {
					active: editor.isActive('strike')
				})}
				onClick={() => {
					editor.chain().focus().toggleStrike().run()
				}}
			>
				<TbStrikethrough />
			</div>
		</Tooltip>
	)
}
