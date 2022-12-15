import React from 'react'
import Header from '@/app/components/header'
import { Input } from '@olaf/react-ui/src'
import { TbSearch } from 'react-icons/tb'

export default function Favorites() {
	return (
		<>
			<Header heading="收藏夹">
				<Input prefix={<TbSearch />} placeholder="搜收藏" />
			</Header>
			<div className="p-8"></div>
		</>
	)
}
