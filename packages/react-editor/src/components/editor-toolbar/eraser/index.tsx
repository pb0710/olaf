import { Tooltip } from '@olaf/react-ui/src'
import { Editor } from '@tiptap/core'
import React from 'react'
import { TbEraser } from 'react-icons/tb'
import './index.scss'

export default ({ editor }: { editor: Editor }) => {
	return (
		<Tooltip placement="bottom" popup="清除格式">
			<div
				className="g-eraser"
				onClick={() => {
					editor.chain().focus().clearNodes().unsetAllMarks().run()
				}}
			>
				<TbEraser />
			</div>
		</Tooltip>
	)
}
