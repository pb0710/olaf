import { Tooltip } from '@olaf/react-ui/src'
import { cls } from '@olaf/utils/src'
import { Editor } from '@tiptap/core'
import React from 'react'
import { TbList } from 'react-icons/tb'
import './index.scss'

export default function BulletList({ editor }: { editor: Editor }) {
	return (
		<Tooltip placement="bottom" title="无序列表">
			<div
				className={cls('g-bullet-list-icon', {
					active: editor.isActive('bulletlist'),
					disabled: !editor.can().toggleBulletList()
				})}
				onClick={() => {
					editor.chain().focus().toggleBulletList().run()
				}}
			>
				<TbList />
			</div>
		</Tooltip>
	)
}
