import { Tooltip } from '@olaf/react-ui/src'
import { cls } from '@olaf/utils/src'
import { Editor } from '@tiptap/core'
import React from 'react'
import { TbCode } from 'react-icons/tb'
import './index.scss'

export default function InlineCode({ editor }: { editor: Editor }) {
	return (
		<Tooltip placement="bottom" title="代码">
			<div
				className={cls('g-inline-code-icon', {
					active: editor.isActive('code'),
					disabled: !editor.can().toggleCode()
				})}
				onClick={() => {
					editor.chain().focus().toggleCode().run()
				}}
			>
				<TbCode />
			</div>
		</Tooltip>
	)
}
