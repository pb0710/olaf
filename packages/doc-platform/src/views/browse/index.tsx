import BackTop from '@/app/components/back-top'
import Header from '@/app/components/header'
import { useBoolean } from '@olaf/react-hook/src'
import { Card, Input, List, Modal, Radio } from '@olaf/react-ui/src'
import React, { useState } from 'react'
import { TbSearch } from 'react-icons/tb'
import Feed from './components/feed'

export default function Browse() {
	const [open, { setTrue: showSearchModal, setFalse: hideSearchModal }] = useBoolean(false)
	const [feedTab, setFeedTab] = useState<string | number>(0)
	const result = []

	return (
		<>
			<Header heading="浏览" sticky bordered>
				<Radio.Group
					type="tab"
					options={[
						{ label: 0, child: '最新' },
						{ label: 1, child: '关注' }
					]}
					value={feedTab}
					onChange={setFeedTab}
				></Radio.Group>
				<Input prefix={<TbSearch />} placeholder="搜动态" outline={false} onFocus={showSearchModal} />
			</Header>
			<BackTop target={document.getElementById('app-content')!} />

			<Modal open={open} onCancel={hideSearchModal} unmountOnExit alignCenter={false}>
				<Card className="p-0 bg-#ebebeb! w-140! m-t-40" bordered={false} shadow>
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
			</Modal>

			<div className="p-8">
				<Feed feedTab={Number(feedTab)} />
			</div>
		</>
	)
}
