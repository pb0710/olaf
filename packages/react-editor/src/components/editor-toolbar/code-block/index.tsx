import { Dropdown } from '@olaf/react-ui/src'
import { cls } from '@olaf/utils/src'
import { Editor } from '@tiptap/core'
import React from 'react'
import { BiCodeCurly } from 'react-icons/bi'
import './index.scss'

export default ({ editor }: { editor: Editor }) => {
	return (
		<Dropdown.Item
			icon={
				<div
					className={cls('g-code-block-icon', {
						active: editor.isActive('codeBlock')
					})}
				>
					<BiCodeCurly />
				</div>
			}
			onClick={() => {
				editor.chain().focus().toggleCodeBlock().run()
			}}
		>
			代码块
		</Dropdown.Item>
	)
}
