import { Avatar, Dropdown, Tooltip } from '@olaf/react-ui/src'
import { cls } from '@olaf/utils/src'
import React from 'react'

interface AccountProps {
	expand: boolean
}

export default function Account({ expand }: AccountProps) {
	return (
		<Tooltip title={'未登录'} placement="right" disabled={expand}>
			<Dropdown
				placement="top-start"
				trigger="click"
				content={<Dropdown.Menu className="!pt-2 !pb-2 !pl-4 !pr-4 w-52">1231313213132</Dropdown.Menu>}
			>
				<div
					className={cls(
						'border-0 bg-transparent w-100% h-12 flex items-center p-1 b-rd-2 active-bg-#00000018 hover-not-active-bg-#00000010 cursor-pointer select-none'
					)}
				>
					<Avatar round />
					{expand && <div className="flex-1 break-all ws-nowrap ml-2">未登录</div>}
				</div>
			</Dropdown>
		</Tooltip>
	)
}
