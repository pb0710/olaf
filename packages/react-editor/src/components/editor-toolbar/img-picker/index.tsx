import { Dropdown } from '@olaf/react-ui/src'
import { cls } from '@olaf/utils/src'
import { Editor } from '@tiptap/core'
import React, { useState } from 'react'
import { HiOutlinePhotograph } from 'react-icons/hi'
import './index.scss'

export default function ImgPicker({ editor }: { editor: Editor }) {
	const [picURL, setPicURL] = useState('http://pic.5tu.cn/uploads/allimg/2010/pic_5tu_big_202009292005352919.jpg')
	return (
		<Dropdown.Item
			icon={
				<div className={cls('g-img-picker')}>
					<HiOutlinePhotograph />
				</div>
			}
			onClick={() => {
				editor
					.chain()
					.focus()
					.setImage({
						src: picURL
					})
					.run()
			}}
		>
			图片
		</Dropdown.Item>
	)
}
