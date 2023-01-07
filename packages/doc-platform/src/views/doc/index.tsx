import BackTop from '@/app/components/back-top'
import Header from '@/app/components/header'
import Editor from '@olaf/react-editor/src'
import { useBoolean } from '@olaf/react-hook/src'
import { Button, Dialog, Space } from '@olaf/react-ui/src'
import { storage } from '@olaf/utils/src'
import dayjs from 'dayjs'
import React, { useState } from 'react'

export default function Doc() {
	const [lastModify, setLastModify] = useState(storage.local.get<string>('doc-last-modify') ?? '')
	const [hadModify, { setTrue: modify }] = useBoolean(false)

	const [saveDialogOpen, { setTrue: showSaveDialog, setFalse: hideSaveDialog }] = useBoolean(false)

	const editor = Editor.useEditor({
		content: storage.local.get<string>('doc-html'),
		autofocus: 'end',
		onUpdate({ editor }) {
			const now = dayjs().toString()
			setLastModify(now)
			modify()
			storage.local.set('doc-last-modify', now)
			storage.local.set('doc-html', editor.getHTML())
		}
	})

	if (!editor) return null
	const textLen = editor.getText().length

	const handleSave = () => {
		console.log('save', editor.getHTML())
		showSaveDialog()
	}

	const docTips = (
		<div className="flex">
			{hadModify && (
				<>
					{lastModify && <div className="text-#999">已保存：{dayjs(lastModify).format('HH:mm')}</div>}
					<span className="text-#999 m-l-4 m-r-4">·</span>
				</>
			)}
			<div className="text-#999">
				正文字数：<span className="inline-block min-w-10">{textLen}</span>
			</div>
		</div>
	)

	const saveDialog = (
		<Dialog
			open={saveDialogOpen}
			title="保存文档"
			okText="保存"
			cancelText="取消"
			closeIcon={null}
			onCancel={hideSaveDialog}
		>
			Content
		</Dialog>
	)

	return (
		<>
			<Header heading="文档" bordered sticky>
				<Space align="center" size="large">
					{docTips}
					<Button primary onClick={handleSave}>
						保存
					</Button>
				</Space>
			</Header>
			<BackTop target={document.getElementById('app-content')!} />
			{saveDialog}
			<div className="flex justify-center sticky top-16 z-10">
				<div className="border-b-#ddd border-b-1 p-3 bg-#fff shadow-[0_12px_16px_-8px_rgba(0,0,0,0.02)]">
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
