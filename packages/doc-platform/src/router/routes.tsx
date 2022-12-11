import React, { createElement, lazy } from 'react'
import { TbHistory, TbStar, TbNotes, TbLayout, TbBook2 } from 'react-icons/tb'
import { Navigate } from 'react-router-dom'

export const nav_routes = [
	{
		path: 'browse',
		element: createElement(lazy(() => import('@/views/browse'))),
		state: {
			nav_name: '浏览',
			icon: <TbLayout />
		}
	},
	{
		path: 'libary',
		state: {
			nav_name: '知识库',
			icon: <TbBook2 />,
			element: createElement(lazy(() => import('@/views/libary')))
		},
		children: [
			{
				path: 'doc',
				element: createElement(lazy(() => import('@/views/doc'))),
				state: {
					nav_name: '文档',
					icon: <TbNotes />
				}
			}
		]
	},
	{
		path: 'favorites',
		element: createElement(lazy(() => import('@/views/favorites'))),
		state: {
			nav_name: ' 收藏夹',
			icon: <TbStar />
		}
	},
	{
		path: 'history',
		element: createElement(lazy(() => import('@/views/history'))),
		state: {
			nav_name: '足迹',
			icon: <TbHistory />
		}
	}
]

const routes = [
	...nav_routes,
	{
		path: '*',
		element: <Navigate to="browse" replace />
	}
]

export default routes
