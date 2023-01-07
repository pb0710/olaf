import { useBoolean } from '@olaf/react-hook/src'
import { Dropdown, Popover } from '@olaf/react-ui/src'
import { cls } from '@olaf/utils/src'
import { Editor } from '@tiptap/core'
import React, { useEffect, useMemo, useState } from 'react'
import { TbTable } from 'react-icons/tb'
import './index.scss'

export default function TablePicker({ editor }: { editor: Editor }) {
	const [open, { setBool: setOpen, setFalse: hide, setReverse: toggle }] = useBoolean(false)
	const [row, setRow] = useState(3)
	const [col, setCol] = useState(3)

	const handleReset = () => {
		setRow(3)
		setCol(3)
	}

	const handleSelect = () => {
		editor.chain().focus().insertTable({ rows: row, cols: col }).run()
		hide()
	}

	const tableList = useMemo(() => {
		return Array.from(Array(10)).map(() => {
			return Array.from(Array(10))
		})
	}, [])

	useEffect(() => {
		if (open) {
			handleReset()
		}
	}, [open])

	const contentEle = (
		<div className="g-table-popup">
			<div className="g-table-list">
				{tableList.map((item, i) =>
					item.map((_, j) => (
						<div
							key={`${i}x${j}`}
							className={cls('g-table-ceil', {
								active: i < row && j < col
							})}
							onMouseEnter={() => {
								setRow(i + 1)
								setCol(j + 1)
							}}
							onClick={handleSelect}
						></div>
					))
				)}
			</div>
			<div className="g-table-rows-cols">
				{row} x {col}
			</div>
		</div>
	)

	return (
		<Popover trigger="hover" open={open} onOpenChange={setOpen} placement="right-start" content={contentEle}>
			<Dropdown.Item
				icon={
					<div className="g-table-picker">
						<TbTable />
					</div>
				}
				onClick={toggle}
			>
				表格
			</Dropdown.Item>
		</Popover>
	)
}
