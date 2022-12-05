import { Trigger, Divider, Space, Button } from '@olaf/react-ui/src'
import React, { useState } from 'react'

export default () => {
	const [visible, setVisible] = useState(false)

	const createContent = (text: string) => (
		<div
			style={{
				width: 'max-content',
				border: '1px solid #ddd',
				boxShadow: '1px 4px 8px rgba(0,0,0,.1)',
				background: '#fff',
				padding: 8
			}}
		>
			{text}
		</div>
	)

	return (
		<div style={{ padding: 24 }}>
			<h1>Trigger</h1>
			<Space>
				<Trigger trigger="hover" content={createContent('tooltip')}>
					<Button>hover</Button>
				</Trigger>
				<Trigger trigger="click" content={createContent('tooltip')}>
					<Button>click</Button>
				</Trigger>
				<Trigger
					trigger="manual"
					content={createContent('tooltip')}
					visible={visible}
					onVisibleChange={setVisible}
				>
					<Button onClick={() => setVisible(pre => !pre)}>manual</Button>
				</Trigger>
			</Space>
			<Divider />
			<Space>
				<Trigger motion="none" content={createContent('tooltip')}>
					<Button>no motion</Button>
				</Trigger>
				<Trigger motion="grow" content={createContent('tooltip')}>
					<Button>grow</Button>
				</Trigger>
				<Trigger motion="stretch" content={createContent('tooltip')}>
					<Button>stretch</Button>
				</Trigger>
			</Space>
		</div>
	)
}
