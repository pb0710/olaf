import { useBoolean } from '@olaf/react-hook/src'
import { Dropdown, Tooltip } from '@olaf/react-ui/src'
import { Editor } from '@tiptap/core'
import React, { createElement } from 'react'
import { GoChevronDown } from 'react-icons/go'
import './index.scss'

export default ({ editor }: { editor: Editor }) => {
	type HeadingLevel = 1 | 2 | 3 | 4
	interface Option {
		value: 0 | HeadingLevel
		label: string
		tagName: string
	}
	const options: Option[] = [
		{
			value: 1,
			label: '标题 1',
			tagName: 'h1'
		},
		{
			value: 2,
			label: '标题 2',
			tagName: 'h2'
		},
		{
			value: 3,
			label: '标题 3',
			tagName: 'h3'
		},
		{
			value: 4,
			label: '标题 4',
			tagName: 'h4'
		},
		{
			value: 0,
			label: '正文',
			tagName: 'span'
		}
	]
	const [visible, { setBool: setVisible, setFalse: hide, setReverse: toggle }] = useBoolean(false)

	let selection = options.find(opt => opt.value === 0)!
	for (const opt of options) {
		if (editor.isActive('heading', { level: opt.value })) {
			selection = opt
			break
		}
	}

	const isMainText = (value: Option['value']): value is 0 => value === 0

	const handleSelect = (opt: Option) => {
		const level = opt.value
		if (!isMainText(level)) {
			editor.chain().focus().setHeading({ level }).run()
		} else if (!isMainText(selection.value)) {
			editor.chain().focus().toggleHeading({ level: selection.value }).run()
		}
		hide()
	}

	return (
		<Dropdown
			trigger="manual"
			open={visible}
			onVisibleChange={setVisible}
			onClickOutside={() => {
				hide()
			}}
			popup={
				<Dropdown.Menu className="g-heading-dropdown">
					{options.map(opt => {
						const heading = createElement(opt.tagName, {}, opt.label)
						return (
							<Dropdown.Item
								key={opt.value}
								active={selection.value === opt.value}
								onClick={() => handleSelect(opt)}
							>
								{heading}
							</Dropdown.Item>
						)
					})}
				</Dropdown.Menu>
			}
		>
			<Tooltip placement="bottom" popup="标题">
				<div className="g-heading-picker" onClick={toggle}>
					<div className="g-heading-label">{selection.label}</div>
					<div className="g-heading-arrow">
						<GoChevronDown />
					</div>
				</div>
			</Tooltip>
		</Dropdown>
	)
}
