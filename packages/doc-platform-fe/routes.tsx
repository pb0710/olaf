import React, { createElement, lazy } from 'react'
import { Navigate } from 'react-router-dom'

export const navRoutes = [
	{
		name: 'home',
		path: 'home',
		element: createElement(lazy(() => import('@/views/Home')))
	}
]

const routes = [
	...navRoutes,
	{
		path: '*',
		element: <Navigate to="home" replace />
	}
]

export default routes
