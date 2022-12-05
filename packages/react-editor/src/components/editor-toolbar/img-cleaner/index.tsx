import { Tooltip } from '@olaf/react-ui/src'
import { cls } from '@olaf/utils/src'
import { Editor } from '@tiptap/core'
import React from 'react'
import { TbTrashX } from 'react-icons/tb'
import './index.scss'

export default ({ editor }: { editor: Editor }) => {
	return (
		<Tooltip placement="bottom" content="删除图片">
			<div
				className={cls('g-img-cleaner')}
				onClick={() => {
					editor.commands.deleteSelection()
					editor.commands.focus()
				}}
			>
				<TbTrashX />
			</div>
		</Tooltip>
	)
}
