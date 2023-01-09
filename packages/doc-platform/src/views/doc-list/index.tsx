import React from 'react'
import BackTop from '@/app/components/back-top'
import Header from '@/app/components/header'
import { Input } from '@olaf/react-ui/src'
import { TbSearch } from 'react-icons/tb'
import { useAppContentEl } from '@/hooks'

export default function DocList() {
	const app_content_ele = useAppContentEl()
	return (
		<>
			<Header heading="文档" bordered sticky>
				<Input prefix={<TbSearch />} placeholder="搜记录" />
			</Header>
			{app_content_ele && <BackTop target={app_content_ele} />}

			<div className="p-8">
				<div className="grid grid-cols-[repeat(auto-fill,200px)] grid-gap-6 justify-center">
					<div className="h-60"></div>
				</div>
			</div>
		</>
	)
}
