import BackTop from '@/app/components/back-top'
import Header from '@/app/components/header'
import { useBoolean } from '@olaf/react-hook/src'
import { Card, Input, List, Modal } from '@olaf/react-ui/src'
import React from 'react'
import { TbSearch } from 'react-icons/tb'
import Feed from './components/feed'

export default function Browse() {
	const [open, { setTrue: showSearchModal, setFalse: hideSearchModal }] = useBoolean(false)

	const result = []

	return (
		<>
			<Header heading="浏览" sticky bordered>
				<Input prefix={<TbSearch />} placeholder="搜动态" onFocus={showSearchModal} />
			</Header>
			<BackTop target={document.getElementById('app-content')!} />
			<Modal open={open} onCancel={hideSearchModal} unmountOnExit>
				<div className="h-120">
					<Card className="p-0 bg-#eee! w-140!" bordered={false} shadow>
						<Input
							className="w-100%! text-4"
							autoFocus
							size="large"
							placeholder="搜一搜"
							prefix={<TbSearch className="text-4 mr-1 ml-1" />}
							allowClear
						/>
						{result.length > 0 ? (
							<List size="large" className="overflow-y-auto max-h-98 mt-6">
								<List.Item>11111</List.Item>
								<List.Item>11111</List.Item>
								<List.Item>11111</List.Item>
							</List>
						) : null}
					</Card>
				</div>
			</Modal>
			<div className="p-8">
				<Feed />
			</div>
		</>
	)
}
