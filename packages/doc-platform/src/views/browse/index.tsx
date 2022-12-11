import Header from '@/app/components/header'
import { useBoolean } from '@olaf/react-hook/src'
import { Card, Input, Modal } from '@olaf/react-ui/src'
import React from 'react'
import { TbSearch } from 'react-icons/tb'
import Feed from './components/feed'

export default function Browse() {
	const [open, { setTrue: showSearchModal, setFalse: hideSearchModal }] = useBoolean(false)
	return (
		<>
			<Header heading="浏览">
				<Input prefix={<TbSearch />} onFocus={showSearchModal} />
			</Header>
			<Modal open={open} onCancel={hideSearchModal} unmountOnExit>
				<Card className="p-0" bordered={false} shadow>
					<Input
						className="w-100% text-4"
						autoFocus
						bordered={false}
						placeholder="搜一搜"
						prefix={<TbSearch className="text-5 mr-3" />}
					/>
					<div></div>
				</Card>
			</Modal>
			<div className="p-8">
				<Feed />
			</div>
		</>
	)
}
