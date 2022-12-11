import { Avatar, Button, Image } from '@olaf/react-ui/src'
import React from 'react'
import { TbThumbUp } from 'react-icons/tb'

export default function Feed() {
	const feed_list = [
		{
			id: 1,
			heading: '知识管理的 IPO 模型',
			content: {
				html: '<p>从前面知道，要想做到有效的知识管理，其中一个通用的方法就是 “IPO 模型”，其中 IPO 是 Input- Process- Output 的缩写，意即知识管理的“输入-处理-输出”过程。这个知识管理 IPO 模型是知识管理 3.0 的核心，也是语雀数字花园的根基。那么，IPO 模型到底是什</p>'
			},
			cover: 'https://th.wallhaven.cc/small/7p/7p3we9.jpg',
			user: {
				uid: 12312323,
				nickname: '匿名',
				avatar: ''
			},
			last_modify_at: '2022/12/11',
			first_published_at: '2022/12/02',
			private: false,
			likes_count: 23
		}
	]
	return (
		<div className="max-w-240">
			{feed_list.map(feed => {
				return (
					<div className="border-b-#eee border-b">
						<div className="flex items-center mb-4">
							<Avatar size="small" round src={feed.user.avatar} />
							<div className="flex items-center">
								<div className="ml-3">{feed.user.nickname}</div>
								<div className="ml-2 color-#999 text-3">{feed.last_modify_at}</div>
							</div>
						</div>
						<div className="flex-1 flex pl-9 mb-3">
							<div className="flex-1">
								<div className="text-4 font-600 mb-3">{feed.heading}</div>
								<div className="" dangerouslySetInnerHTML={{ __html: feed.content.html }}></div>
							</div>
							<Image
								className="w-40 h-27 border-l border-l-#eee b-rd-2 object-cover ml-12"
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
