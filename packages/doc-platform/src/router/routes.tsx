import React, { createElement, lazy } from 'react'
import { Navigate } from 'react-router-dom'

export const navRoutes = [
	{
		name: 'browse',
		path: 'browse',
		element: createElement(lazy(() => import('@/views/browse')))
	}
]

const routes = [
	...navRoutes,
	{
		path: '*',
		element: <Navigate to="browse" replace />
	}
]

export default routes
