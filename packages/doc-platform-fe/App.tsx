import React, { Suspense } from 'react'
import { NavLink, useRoutes } from 'react-router-dom'
import { cls } from '@olaf/utils/src'
import './App.scss'
import router, { navRoutes } from './routes'
import { Loading, Space } from '@olaf/react-ui/src'

export default () => {
	const content = useRoutes(router)

	const nav = (
		<Space direction="vertical" size="small">
			{navRoutes.map(({ path, name }) => (
				<NavLink
					key={path}
					to={`/component/${path}`}
					className={({ isActive }) =>
						cls('nav-item', {
							active: isActive
						})
					}
				>
					<div className="wrap">{name}</div>
				</NavLink>
			))}
		</Space>
	)

	return (
		<div className="app">
			<div className="nav-bar">{nav}</div>
			<div className="content">
				<Suspense fallback={<Loading />}>{content}</Suspense>
			</div>
		</div>
	)
}
