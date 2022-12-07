import { Tooltip } from '@olaf/react-ui/src'
import { cls } from '@olaf/utils/src'
import { Editor } from '@tiptap/core'
import React from 'react'
import { TbQuote } from 'react-icons/tb'
import './index.scss'

export default ({ editor }: { editor: Editor }) => {
	return (
		<Tooltip placement="bottom" popup="引用">
			<div
				className={cls('g-blockquote', {
					active: editor.isActive('blockquote')
				})}
				onClick={() => {
					editor.chain().focus().toggleBlockquote().run()
				}}
			>
				<TbQuote />
			</div>
		</Tooltip>
	)
}
