import { useBoolean } from '@olaf/react-hook/src'
import { Button, Divider, Popover, Tooltip } from '@olaf/react-ui/src'
import { cls } from '@olaf/utils/src'
import { Editor } from '@tiptap/core'
import React, { useState } from 'react'
import { BiFont } from 'react-icons/bi'
import { GoChevronDown } from 'react-icons/go'
import './index.scss'

export default ({ editor }: { editor: Editor }) => {
	const DEFAULT_COLOR = '#333333'
	const options = [
		'#ffffff',
		'#cccccc',
		'#999999',
		'#666666',
		'#333333',
		'#000000',
		'#ffa8a8',
		'#ffd800',
		'#faf594',
		'#a2ddb8',
		'#40a9ff',
		'#b197fc',
		'#d83931',
		'#de7802',
		'#dc9b04',
		'#21a121',
		'#245bdb',
		'#6425d0'
	]

	const [inkColor, setInkColor] = useState(DEFAULT_COLOR)
	const [visible, { setBool: setVisible, setFalse: hide, setReverse: toggle }] = useBoolean(false)

	const hasActive = options.some(opt => editor.isActive('textStyle', { color: opt }))

	const handleSelect = (opt: string) => {
		setInkColor(opt)
		editor.chain().focus().setColor(opt).run()
	}

	const handleReset = () => {
		setInkColor(DEFAULT_COLOR)
		editor.chain().focus().setColor(DEFAULT_COLOR).run()
	}

	return (
		<Tooltip placement="bottom" popup="文字颜色">
			<div className="g-text-color-picker">
				<div
					className={cls('g-text-color-setter', {
						active: hasActive
					})}
					onClick={() => {
						editor.chain().focus().setColor(inkColor).run()
					}}
				>
					<BiFont />
					<div className="g-text-color-line" style={{ backgroundColor: inkColor }}></div>
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
						<div className="g-text-color-popup">
							<Button block onClick={handleReset}>
								恢复默认
							</Button>
							<Divider />
							<div className="g-colors-wrapper">
								{options.map(opt => {
									return (
										<div
											key={opt}
											className={cls('g-color-item', {
												active: editor.isActive('textStyle', { color: opt })
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
						className={cls('g-text-color-dropdown', {
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
