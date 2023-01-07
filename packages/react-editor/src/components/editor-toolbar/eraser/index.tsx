import { Tooltip } from '@olaf/react-ui/src'
import { cls } from '@olaf/utils/src'
import { Editor } from '@tiptap/core'
import React from 'react'
import { TbEraser } from 'react-icons/tb'
import './index.scss'

export default function Eraser({ editor }: { editor: Editor }) {
	return (
		<Tooltip placement="bottom" title="清除格式">
			<div
				className={cls('g-eraser', {
					disabled: !editor.can().unsetAllMarks()
				})}
				onClick={() => {
					editor.chain().focus().clearNodes().unsetAllMarks().run()
				}}
			>
				<TbEraser />
			</div>
		</Tooltip>
	)
}
