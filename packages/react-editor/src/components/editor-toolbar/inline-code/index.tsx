import { Tooltip } from '@olaf/react-ui/src'
import { cls } from '@olaf/utils/src'
import { Editor } from '@tiptap/core'
import React from 'react'
import { TbCode } from 'react-icons/tb'
import './index.scss'

export default ({ editor }: { editor: Editor }) => {
	return (
		<Tooltip placement="bottom" popup="代码">
			<div
				className={cls('g-inline-code-icon', {
					active: editor.isActive('code')
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
