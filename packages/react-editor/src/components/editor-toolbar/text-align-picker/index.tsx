import { Popover, Tooltip } from '@olaf/react-ui/src'
import { cls } from '@olaf/utils/src'
import { Editor } from '@tiptap/core'
import React, { ReactElement, useState } from 'react'
import { TbAlignCenter, TbAlignJustified, TbAlignLeft, TbAlignRight } from 'react-icons/tb'
import { GoChevronDown } from 'react-icons/go'
import './index.scss'
import { useBoolean } from '@olaf/react-hook/src'

export default ({ editor }: { editor: Editor }) => {
	interface Option {
		value: string
		label: string
		icon: ReactElement
	}
	const options: Option[] = [
		{
			value: 'left',
			label: '左对齐',
			icon: <TbAlignLeft />
		},
		{
			value: 'center',
			label: '居中对齐',
			icon: <TbAlignCenter />
		},
		{
			value: 'right',
			label: '右对齐',
			icon: <TbAlignRight />
		},
		{
			value: 'justify',
			label: '两端对齐',
			icon: <TbAlignJustified />
		}
	]

	let selection = options[0]
	for (const opt of options) {
		if (editor.isActive({ textAlign: opt.value })) {
			selection = opt
			break
		}
	}

	const handleSelect = (opt: Option) => {
		editor.chain().focus().setTextAlign(opt.value).run()
	}
	const [visible, { setReverse: toggle, setFalse: hide, setBool: setVisible }] = useBoolean(false)

	return (
		<Popover
			trigger="manual"
			open={visible}
			onVisibleChange={setVisible}
			onClickOutside={hide}
			placement="bottom"
			content={
				<div className="g-text-align-popup">
					{options.map(opt => {
						return (
							<Tooltip key={opt.value} placement="bottom" popup={opt.label}>
								<div
									className={cls('g-align-icon-wrapper', {
										active: editor.isActive({ textAlign: opt.value })
									})}
									onClick={() => handleSelect(opt)}
								>
									{opt.icon}
								</div>
							</Tooltip>
						)
					})}
				</div>
			}
		>
			<Tooltip placement="bottom" popup="对齐方式">
				<div className="g-text-align-picker" onClick={toggle}>
					<div className="g-text-align-label">{selection.icon}</div>
					<div className="g-text-align-dropdown">
						<GoChevronDown />
					</div>
				</div>
			</Tooltip>
		</Popover>
	)
}
