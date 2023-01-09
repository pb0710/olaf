import { useBoolean } from '@olaf/react-hook/src'
import { Divider, Tooltip } from '@olaf/react-ui/src'
import { cls, storage } from '@olaf/utils/src'
import React, { lazy, Suspense, useEffect } from 'react'
import { TbDotsVertical } from 'react-icons/tb'
import Menu from './components/menu'

const Account = lazy(() => import('./components/account'))

export default function Sidebar() {
	const local_expand = storage.session.get<boolean>('sidebar-expand')
	const [expand, { setReverse: toggle_expand }] = useBoolean(local_expand ?? true)

	useEffect(() => {
		storage.session.set('sidebar-expand', expand)
	}, [expand])

	return (
		<aside
			className={cls(
				'flex flex-col h-screen border-r-#ebebeb border-r bg-#f4f4f4 p-4 transition-width-300',
				expand ? 'w-60' : 'w-20'
			)}
		>
			<Menu expand={expand} />

			<Suspense>
				<Account expand={expand} />
			</Suspense>

			<Divider />

			<Tooltip title={expand ? '收起' : '展开'} placement="right">
				<button
					className="border-0 bg-transparent w-12 h-8 flex items-center justify-center b-rd-2 
					active-bg-#00000018 hover-not-active-bg-#00000010 cursor-pointer"
					onClick={toggle_expand}
				>
					<TbDotsVertical />
				</button>
			</Tooltip>
		</aside>
	)
}
