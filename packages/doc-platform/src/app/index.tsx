import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import router from '../router/routes'
import { Loading } from '@olaf/react-ui/src'
import Sidebar from './components/sidebar'

export default function App() {
	const content = useRoutes(router)

	return (
		<div className="flex">
			<Sidebar />
			<div className="flex-1 h-screen border-l-#eee border-l overflow-y-auto">
				<Suspense fallback={<Loading />}>{content}</Suspense>
			</div>
		</div>
	)
}
