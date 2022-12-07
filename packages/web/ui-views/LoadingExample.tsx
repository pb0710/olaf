// import { mdiLoading } from '@mdi/js'
import React, { useState } from 'react'
import { Button, Card, Divider, Loading, Space } from '@olaf/react-ui/src'

export default () => {
	const [spinning, setSpinning] = useState(false)
	return (
		<div style={{ padding: 24 }}>
			<h1>Loading</h1>
			<Loading />
			<Divider />
			<Space size="large">
				<Loading size="small" />
				<Loading size="medium" />
				<Loading size="large" />
			</Space>
			<div style={{ fontSize: 32 }}>
				<Loading size="inherit" />
			</div>
			<Divider />
			<Space direction="vertical">
				<Button
					onClick={() => {
						setSpinning(p => !p)
					}}
				>
					Toggle spinning
				</Button>
				<Loading spinning={spinning}>
					<Card header="loading wrapper">Content</Card>
				</Loading>
			</Space>
			<Divider />
			{/* <Loading icon={<Icon path={mdiLoading} spin={1} size="24px" />} style={{ fontSize: 20 }}>
				<Card header="custom spinning icon">Content</Card>
			</Loading>
			<Divider /> */}
			<Loading description="text description">
				<Card header="text description">Content</Card>
			</Loading>
		</div>
	)
}
