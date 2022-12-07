import { useBoolean } from '@olaf/react-hook/src'
import { Dropdown, Tooltip } from '@olaf/react-ui/src'
import { Editor } from '@tiptap/react'
import React from 'react'
import { GoChevronDown } from 'react-icons/go'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import CodeBlock from '../code-block'
import HorizontalDivider from '../horizontal-divider'
import ImgPicker from '../img-picker'
import LinkPicker from '../link-picker'
import TablePicker from '../table-picker'
import './index.scss'

export default ({ editor }: { editor: Editor }) => {
	const [visible, { setBool: setVisible, setFalse: hide, setReverse: toggle }] = useBoolean(false)
	return (
		<Dropdown
			trigger="manual"
			open={visible}
			onVisibleChange={setVisible}
			onClickOutside={() => {
				hide()
			}}
			popup={
				<Dropdown.Menu className="g-insert-dropdown">
					<ImgPicker editor={editor} />
					<TablePicker editor={editor} />
					<LinkPicker editor={editor} />
					<CodeBlock editor={editor} />
					<HorizontalDivider editor={editor} />
				</Dropdown.Menu>
			}
		>
			<div>
				<Tooltip placement="bottom" popup="插入">
					<div className="g-insert" onClick={toggle}>
						<div className="g-insert-icon">
							<MdOutlineAddCircleOutline />
						</div>
						<div className="g-insert-arrow">
							<GoChevronDown />
						</div>
					</div>
				</Tooltip>
			</div>
		</Dropdown>
	)
}
