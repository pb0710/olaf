import { useBoolean } from '@olaf/react-hook/src'
import { Button, Divider, Popover, Tooltip } from '@olaf/react-ui/src'
import { cls } from '@olaf/utils/src'
import { Editor } from '@tiptap/core'
import React, { useState } from 'react'
import { GoChevronDown } from 'react-icons/go'
import { RiMarkPenLine } from 'react-icons/ri'
import './index.scss'

export default ({ editor }: { editor: Editor }) => {
	const options = [
		'#faefde',
		'#e42d44',
		'#f2eae0',
		'#7bad5f',
		'#e5d7ad',
		'#ffd800',
		'#bccf90',
		'#f6a09a',
		'#ff7900',
		'#edb04c',
		'#8a3c48',
		'#a0c198',
		'#cfa33e',
		'#d23538',
		'#36527d',
		'#8d587e',
		'#a2ddb8',
		'#faf594',
		'#cebece',
		'#eff2fa',
		'#f7f2ed',
		'#b197fc',
		'#40a9ff',
		'#ffa8a8'
	]

	const [inkColor, setInkColor] = useState('#faf594')
	const [visible, { setBool: setVisible, setFalse: hide, setReverse: toggle }] = useBoolean(false)

	const hasActive = options.some(opt => editor.isActive('highlight', { color: opt }))

	const handleSelect = (opt: string) => {
		setInkColor(opt)
		editor.chain().focus().setHighlight({ color: opt }).run()
	}

	return (
		<Tooltip placement="bottom" title="标记">
			<div className="g-highlight-picker">
				<div
					className={cls('g-highlight-setter', {
						active: hasActive
					})}
					onClick={() => {
						editor.chain().focus().toggleHighlight({ color: inkColor }).run()
					}}
				>
					<RiMarkPenLine />
					<div className="g-highlight-line" style={{ backgroundColor: inkColor }}></div>
				</div>
				<Popover
					trigger="manual"
					open={visible}
					onVisibleChange={setVisible}
					onClickOutside={() => {
						hide()
					}}
					placement="bottom-start"
					offsetX={-26}
					content={
						<div className="g-highlight-popup">
							<Button block onClick={() => editor.chain().focus().unsetHighlight().run()}>
								无填充色
							</Button>
							<Divider />
							<div className="g-colors-wrapper">
								{options.map(opt => {
									return (
										<div
											key={opt}
											className={cls('g-color-item', {
												active: editor.isActive('highlight', { color: opt })
											})}
											onClick={() => handleSelect(opt)}
											style={{ backgroundColor: opt }}
										></div>
									)
								})}
							</div>
						</div>
					}
				>
					<div
						className={cls('g-highlight-dropdown', {
							active: visible
						})}
						onClick={toggle}
					>
						<GoChevronDown />
					</div>
				</Popover>
			</div>
		</Tooltip>
	)
}
