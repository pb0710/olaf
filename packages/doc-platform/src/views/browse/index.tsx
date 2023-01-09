import BackTop from '@/app/components/back-top'
import Header from '@/app/components/header'
import { useAppContentEl } from '@/hooks'
import { useBoolean } from '@olaf/react-hook/src'
import { Card, Input, List, Modal, Radio } from '@olaf/react-ui/src'
import React, { useState } from 'react'
import { TbSearch } from 'react-icons/tb'
import Feed from './components/feed'

export default function Browse() {
	const [open, { setTrue: show_search_modal, setFalse: hide_search_modal }] = useBoolean(false)
	const [feed_tab, set_feed_tab] = useState<string | number>(0)
	const app_content_el = useAppContentEl()
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
					value={feed_tab}
					onChange={set_feed_tab}
				></Radio.Group>
				<Input prefix={<TbSearch />} placeholder="搜动态" outline={false} onFocus={show_search_modal} />
			</Header>
			{app_content_el && <BackTop target={app_content_el} />}

			<Modal open={open} onCancel={hide_search_modal} unmountOnExit alignCenter={false}>
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
				<Feed feedTab={Number(feed_tab)} />
			</div>
		</>
	)
}
