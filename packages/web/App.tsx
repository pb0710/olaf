import React from 'react'
import { NavLink, useRoutes } from 'react-router-dom'
import { cls } from '@olaf/utils/src'
import './App.scss'
import router, { componentRoutes } from './routes'
import { Space } from '@olaf/react-ui/src'

const App = () => {
	const contentEle = useRoutes(router)

	const navEle = (
		<Space direction="vertical" size="small">
			{componentRoutes.map(({ path, name }) => (
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
		<div className="example">
			<div className="nav-bar">{navEle}</div>
			<div className="content">{contentEle}</div>
		</div>
	)
}

export default App
