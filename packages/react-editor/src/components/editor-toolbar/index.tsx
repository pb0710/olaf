import { Space } from '@olaf/react-ui/src'
import { BubbleMenu, Editor } from '@tiptap/react'
import React from 'react'
import './index.scss'
import Bold from './bold'
import BulletList from './bullet-list'
import CodeBlock from './code-block'
import Eraser from './eraser'
import HeadingPicker from './heading-picker'
import InlineCode from './inline-code'
import Italic from './italic'
import OrderList from './order-list'
import Redo from './redo'
import Strike from './strike'
import TablePicker from './table-picker'
import Underline from './underline'
import Undo from './undo'
import TextAlignPicker from './text-align-picker'
import ImgPicker from './img-picker'
import Blockquote from './blockquote'
import HighlightPicker from './highlight-picker'
import TextColorPicker from './text-color-picker'
import LinkPicker from './link-picker'
import ImgCleaner from './img-cleaner'
import ImgEditor from './img-editor'
import Insert from './insert'
import HorizontalDivider from './horizontal-divider'

export default ({ editor }: { editor: Editor | null }) => {
	if (!editor) return null

	const tippyOptions = {
		duration: 100,
		zIndex: 2000,
		maxWidth: 'none'
	}

	const textStyleMenuEle = (
		<BubbleMenu
			pluginKey="textStyle"
			editor={editor}
			updateDelay={0}
			tippyOptions={tippyOptions}
			shouldShow={() => {
				return (
					(editor.isActive('heading') || editor.isActive('paragraph')) &&
					!editor.isActive('image') &&
					!editor.isActive('code')
				)
			}}
		>
			<Space className="g-bubble-menu">
				<Bold editor={editor} />
				<Italic editor={editor} />
				<Underline editor={editor} />
				<Strike editor={editor} />
				<InlineCode editor={editor} />
				<HighlightPicker editor={editor} />
				<TextColorPicker editor={editor} />
				{/* <LinkPicker editor={editor} /> */}
			</Space>
		</BubbleMenu>
	)

	const codeActionMenuEle = (
		<BubbleMenu
			pluginKey="codeAction"
			editor={editor}
			updateDelay={0}
			tippyOptions={tippyOptions}
			shouldShow={() => {
				return editor.isActive('code')
			}}
		>
			<Space className="g-bubble-menu">
				<Eraser editor={editor} />
			</Space>
		</BubbleMenu>
	)

	const imgActionMenuEle = (
		<BubbleMenu
			pluginKey="imgAction"
			editor={editor}
			updateDelay={0}
			tippyOptions={tippyOptions}
			shouldShow={() => {
				return editor.isActive('image')
			}}
		>
			<Space className="g-bubble-menu">
				<ImgEditor editor={editor} />
				<ImgCleaner editor={editor} />
			</Space>
		</BubbleMenu>
	)

	return (
		<>
			{textStyleMenuEle}
			{imgActionMenuEle}
			{codeActionMenuEle}
			<Space align="center">
				<Undo editor={editor} />
				<Redo editor={editor} />
				<Eraser editor={editor} />

				<Insert editor={editor} />

				<HeadingPicker editor={editor} />
				<Bold editor={editor} />
				<Italic editor={editor} />
				<Underline editor={editor} />
				<Strike editor={editor} />
				<InlineCode editor={editor} />
				<HighlightPicker editor={editor} />
				<TextColorPicker editor={editor} />
				{/* <LinkPicker editor={editor} /> */}

				<BulletList editor={editor} />
				<OrderList editor={editor} />
				<TextAlignPicker editor={editor} />
				<Blockquote editor={editor} />
				{/* <CodeBlock editor={editor} />
				<HorizontalDivider editor={editor} />
				<TablePicker editor={editor} />
				<ImgPicker editor={editor} /> */}
			</Space>
		</>
	)
}
