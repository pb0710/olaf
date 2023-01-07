import { Tooltip } from '@olaf/react-ui/src'
import { cls } from '@olaf/utils/src'
import { Editor } from '@tiptap/core'
import React from 'react'
import { TbListNumbers } from 'react-icons/tb'
import './index.scss'

export default function OrderList({ editor }: { editor: Editor }) {
	return (
		<Tooltip placement="bottom" title="有序列表">
			<div
				className={cls('g-order-list-icon', {
					active: editor.isActive('orderlist'),
					disabled: !editor.can().toggleOrderedList()
				})}
				onClick={() => {
					editor.chain().focus().toggleOrderedList().run()
				}}
			>
				<TbListNumbers />
			</div>
		</Tooltip>
	)
}
