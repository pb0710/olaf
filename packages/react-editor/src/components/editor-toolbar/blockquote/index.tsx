import { Tooltip } from '@olaf/react-ui/src'
import { cls } from '@olaf/utils/src'
import { Editor } from '@tiptap/core'
import React from 'react'
import { TbQuote } from 'react-icons/tb'
import './index.scss'

export default function Blockquote({ editor }: { editor: Editor }) {
	return (
		<Tooltip placement="bottom" title="引用">
			<div
				className={cls('g-blockquote', {
					active: editor.isActive('blockquote'),
					disabled: !editor.can().toggleBlockquote()
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
