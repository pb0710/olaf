import { cls } from '@olaf/utils/src'
import React, { ReactNode } from 'react'

interface HeaderProps {
	children: ReactNode
	heading: string
}

export default function Header(props: HeaderProps) {
	const { children, heading } = props
	return (
		<header className={cls('flex items-center justify-between h-16 pl-8 pr-8 bg-#fff')}>
			<h1>{heading}</h1>
			{children}
		</header>
	)
}
