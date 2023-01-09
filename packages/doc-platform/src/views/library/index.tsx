import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Library() {
	return (
		<div className="library">
			library
			<Outlet />
		</div>
	)
}
