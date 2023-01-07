import { cls } from '@olaf/utils/src'
import React, { ReactNode } from 'react'

interface HeaderProps {
	children: ReactNode
	heading: string
	sticky?: boolean
	bordered?: boolean
}

export default function Header(props: HeaderProps) {
	const { children, heading, sticky = false, bordered = false } = props
	return (
		<header
			className={cls(
				'flex items-center justify-between h-16 pl-8 pr-8 bg-#fff',
				sticky && 'sticky top-0 z-20',
				bordered && 'b-b b-#ddd',
				sticky && bordered && 'shadow-[0_12px_16px_-8px_rgba(0,0,0,0.02)]'
			)}
		>
			<h1>{heading}</h1>
			{children}
		</header>
	)
}
