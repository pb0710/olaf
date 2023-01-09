import BackTop from '@/app/components/back-top'
import Header from '@/app/components/header'
import { useAppContentEl } from '@/hooks'
import Editor from '@olaf/react-editor/src'
import { useBoolean } from '@olaf/react-hook/src'
import { Button, Dialog, Space } from '@olaf/react-ui/src'
import { storage } from '@olaf/utils/src'
import dayjs from 'dayjs'
import React, { useState } from 'react'

export default function Doc() {
	const app_content_ele = useAppContentEl()
	const [last_modify, set_last_modify] = useState(storage.local.get<string>('doc-last-modify') ?? '')
	const [had_modify, { setTrue: modify }] = useBoolean(false)

	const [save_dialog_open, { setTrue: show_save_dialog, setFalse: hide_save_dialog }] = useBoolean(false)

	const editor = Editor.useEditor({
		content: storage.local.get<string>('doc-html'),
		autofocus: 'end',
		onUpdate({ editor }) {
			const now = dayjs().toString()
			set_last_modify(now)
			modify()
			storage.local.set('doc-last-modify', now)
			storage.local.set('doc-html', editor.getHTML())
		}
	})

	if (!editor) return null
	const text_len = editor.getText().length

	const handle_save = () => {
		console.log('save', editor.getHTML())
		show_save_dialog()
	}

	const doc_tips = (
		<div className="flex">
			{had_modify && (
				<>
					{last_modify && <div className="text-#999">已保存：{dayjs(last_modify).format('HH:mm')}</div>}
					<span className="text-#999 m-l-4 m-r-4">·</span>
				</>
			)}
			<div className="text-#999">
				正文字数：<span className="inline-block min-w-10">{text_len}</span>
			</div>
		</div>
	)

	const save_dialog = (
		<Dialog
			open={save_dialog_open}
			title="保存文档"
			okText="保存"
			cancelText="取消"
			closeIcon={null}
			onCancel={hide_save_dialog}
		>
			Content
		</Dialog>
	)

	return (
		<>
			<Header heading="文档" bordered sticky>
				<Space align="center" size="large">
					{doc_tips}
					<Button primary onClick={handle_save}>
						保存
					</Button>
				</Space>
			</Header>
			{app_content_ele && <BackTop target={app_content_ele} />}
			{save_dialog}
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
