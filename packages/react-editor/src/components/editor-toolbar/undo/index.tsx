import { Tooltip } from '@olaf/react-ui/src'
import { cls } from '@olaf/utils/src'
import { Editor } from '@tiptap/core'
import React from 'react'
import { TbArrowBackUp } from 'react-icons/tb'
import './index.scss'

export default function Undo({ editor }: { editor: Editor }) {
	const disabled = !editor.can().undo()
	return (
		<Tooltip placement="bottom" title="撤销">
			<div
				className={cls('g-undo', {
					disabled
				})}
				onClick={() => {
					if (disabled) return
					editor.chain().focus().undo().run()
				}}
			>
				<TbArrowBackUp />
			</div>
		</Tooltip>
	)
}
