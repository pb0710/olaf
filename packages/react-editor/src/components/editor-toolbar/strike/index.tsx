import { Tooltip } from '@olaf/react-ui/src'
import { cls } from '@olaf/utils/src'
import { Editor } from '@tiptap/core'
import React from 'react'
import { TbStrikethrough } from 'react-icons/tb'
import './index.scss'

export default function Strike({ editor }: { editor: Editor }) {
	return (
		<Tooltip placement="bottom" title="删除线">
			<div
				className={cls('g-strike-icon', {
					active: editor.isActive('strike'),
					disabled: !editor.can().toggleStrike()
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
