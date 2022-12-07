import { Tooltip } from '@olaf/react-ui/src'
import { cls } from '@olaf/utils/src'
import { Editor } from '@tiptap/react'
import React from 'react'
import { TbBold } from 'react-icons/tb'
import './index.scss'

export default (props: { editor: Editor }) => {
	const { editor } = props
	return (
		<Tooltip placement="bottom" popup="粗体">
			<div
				className={cls('g-bold-icon', {
					active: editor.isActive('bold')
				})}
				onClick={() => {
					editor.chain().focus().toggleBold().run()
				}}
			>
				<TbBold />
			</div>
		</Tooltip>
	)
}
