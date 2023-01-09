import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from '../router/routes'
import { Loading } from '@olaf/react-ui/src'
import Sidebar from './components/sidebar'

export default function App() {
	const content = useRoutes(routes)

	return (
		<div className="flex">
			<Sidebar />

			<Suspense
				fallback={
					<Loading size="large" className="flex-1">
						<div className="h-screen"></div>
					</Loading>
				}
			>
				<div id="app-content" className="flex-1 h-screen overflow-y-auto">
					{content}
				</div>
			</Suspense>
		</div>
	)
}
