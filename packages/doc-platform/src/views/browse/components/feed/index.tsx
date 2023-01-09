import { get_feed_list } from '@/api'
import { useFetch } from '@olaf/react-hook/src'
import { Avatar, Button, Image } from '@olaf/react-ui/src'
import React from 'react'
import { TbThumbUp } from 'react-icons/tb'

interface FeedProps {
	feedTab: number
}

export default function Feed(props: FeedProps) {
	const { feedTab } = props
	const {
		data: feed_list,
		error,
		loading
	} = useFetch(get_feed_list, {
		initialData: [],
		params: [
			{
				feed_tab: feedTab
			}
		],
		refreshDeps: [feedTab]
	})
	return (
		<div className="max-w-240 m-l-20">
			{feed_list.map(feed => {
				return (
					<div key={feed.id} className="border-b-#ebebeb border-b mb-8">
						<div className="flex items-center mb-4">
							<Avatar size="small" round src={feed.user.avatar} />
							<div className="flex items-center">
								<div className="ml-3">{feed.user.nickname}</div>
								<div className="ml-2 color-#999 text-3">{feed.last_modify_at}</div>
							</div>
						</div>
						<div className="flex-1 flex pl-9 mb-3">
							<div className="flex-1">
								<div className="text-4 font-600 mb-3 cursor-pointer hover-color-#666">
									{feed.heading}
								</div>
								<div className="" dangerouslySetInnerHTML={{ __html: feed.content.html }}></div>
							</div>
							<Image
								className="w-40 h-27 border-l border-l-#ebebeb b-rd-2 object-cover ml-12"
								src={feed.cover}
							/>
						</div>
						<div className="flex pl-7 mb-4">
							<Button className="!w-auto min-w-auto !pl-2 !pr-2" text circle size="small">
								<TbThumbUp className="text-4" />
								{feed.likes_count && <span className="ml-2">{feed.likes_count}</span>}
							</Button>
						</div>
					</div>
				)
			})}
		</div>
	)
}
