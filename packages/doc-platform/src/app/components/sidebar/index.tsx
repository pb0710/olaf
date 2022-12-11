import { useBoolean } from '@olaf/react-hook/src'
import { Divider, Tooltip } from '@olaf/react-ui/src'
import { cls } from '@olaf/utils/src'
import React, { lazy, Suspense } from 'react'
import { TbDotsVertical } from 'react-icons/tb'
import Menu from './components/menu'

const Account = lazy(() => import('./components/account'))

export default function Sidebar() {
	const [expand, { setReverse: toggleExpand }] = useBoolean(true)
	return (
		<aside className={cls('flex flex-col h-screen bg-#f4f4f4 p-4 transition-all', expand ? 'w-60' : 'w-20')}>
			<Menu expand={expand} />

			<Suspense>
				<Account expand={expand} />
			</Suspense>

			<Divider />

			<Tooltip title={expand ? '收起' : '展开'} placement="right">
				<button
					className="border-0 bg-transparent w-12 h-8 flex items-center justify-center b-rd-2 
					active-bg-#00000018 hover-not-active-bg-#00000010 cursor-pointer"
					onClick={toggleExpand}
				>
					<TbDotsVertical />
				</button>
			</Tooltip>
		</aside>
	)
}
