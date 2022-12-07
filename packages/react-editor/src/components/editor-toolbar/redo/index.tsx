import { Tooltip } from '@olaf/react-ui/src'
import { cls } from '@olaf/utils/src'
import { Editor } from '@tiptap/core'
import React from 'react'
import { TbArrowForwardUp } from 'react-icons/tb'
import './index.scss'

export default ({ editor }: { editor: Editor }) => {
	const disabled = !editor.can().redo()
	return (
		<Tooltip placement="bottom" popup="重做">
			<div
				className={cls('g-redo', {
					disabled
				})}
				onClick={() => {
					if (disabled) return
					editor.chain().focus().redo().run()
				}}
			>
				<TbArrowForwardUp />
			</div>
		</Tooltip>
	)
}
