import React, { useState } from 'react'
import { Button, Divider, Popover, Space } from '@olaf/react-ui/src'

export default () => {
	const [visible, setVisible] = useState(false)
	const ceilStyle = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
	return (
		<div style={{ padding: 24 }}>
			<h1>Popover</h1>
			<Space>
				<Popover trigger="hover" content="Show by hover">
					<Button>Hover</Button>
				</Popover>
				<Popover trigger="click" content="Show by click">
					<Button>Click</Button>
				</Popover>
				<Popover
					trigger="manual"
					content="Show by manual"
					open={visible}
					onVisibleChange={val => {
						console.log('val', val)
						setVisible(val)
					}}
				>
					<Button onClick={() => setVisible(p => !p)}>Manual</Button>
				</Popover>
			</Space>
			<Divider />
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 160px)',
					gridTemplateRows: 'repeat(5, auto)',
					gap: 12,
					justifyContent: 'center'
				}}
			>
				<Popover trigger="hover" placement="top-start" content="Top start">
					<Button block style={ceilStyle}>
						Top start
					</Button>
				</Popover>
				<Popover trigger="hover" placement="top" content="Top">
					<Button block style={ceilStyle}>
						Top
					</Button>
				</Popover>
				<Popover trigger="hover" placement="top-end" content="Top end">
					<Button block style={ceilStyle}>
						Top end
					</Button>
				</Popover>
				<Popover trigger="hover" placement="left-start" content="Left start">
					<Button block style={ceilStyle}>
						Left start
					</Button>
				</Popover>
				<div style={ceilStyle}></div>
				<Popover trigger="hover" placement="right-start" content="Right start">
					<Button block style={ceilStyle}>
						Right start
					</Button>
				</Popover>
				<Popover trigger="hover" placement="left" content="Left">
					<Button block style={ceilStyle}>
						Left
					</Button>
				</Popover>
				<div style={ceilStyle}></div>
				<Popover trigger="hover" placement="right" content="Right">
					<Button block style={ceilStyle}>
						Right
					</Button>
				</Popover>
				<Popover trigger="hover" placement="left-end" content="Left end">
					<Button block style={ceilStyle}>
						Left end
					</Button>
				</Popover>
				<div style={ceilStyle}></div>
				<Popover trigger="hover" placement="right-end" content="Right end">
					<Button block style={ceilStyle}>
						Right end
					</Button>
				</Popover>
				<Popover trigger="hover" placement="bottom-start" content="Bottom start">
					<Button block style={ceilStyle}>
						Bottom start
					</Button>
				</Popover>
				<Popover trigger="hover" placement="bottom" content="Bottom">
					<Button block style={ceilStyle}>
						Bottom
					</Button>
				</Popover>
				<Popover trigger="hover" placement="bottom-end" content="Bottom end">
					<Button block style={ceilStyle}>
						Bottom end
					</Button>
				</Popover>
			</div>
		</div>
	)
}
