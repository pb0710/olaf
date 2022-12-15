import Header from '@/app/components/header'
import Editor from '@olaf/react-editor/src'
import { Button } from '@olaf/react-ui/src'
import React from 'react'

export default function Doc() {
	const editor = Editor.useEditor()
	if (!editor) return null

	const handleSave = () => {
		alert(editor.getHTML())
	}
	return (
		<>
			<Header heading="文档">
				<Button primary onClick={handleSave}>
					保存
				</Button>
			</Header>
			<div className="flex justify-center border-t-#eee border-t-1">
				<div className="border-b-#eee border-b-1 p-2">
					<Editor.Toolbar editor={editor} />
				</div>
			</div>
			<div className="flex pt-6 pb-6">
				<div className="w-180 m-auto">
					<Editor.Content editor={editor} />
				</div>
			</div>
		</>
	)
}
