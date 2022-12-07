// import { mdiCheck, mdiClose } from '@mdi/js'
import React from 'react'
import { Button, Divider, Space, Switch, Tooltip } from '@olaf/react-ui/src'
import './tooltip-example.scss'

export default () => {
	const ceilStyle = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
	return (
		<div style={{ padding: 24 }}>
			<h1>Tooltip</h1>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 160px)',
					gridTemplateRows: 'repeat(5, auto)',
					gap: 12,
					justifyContent: 'center'
				}}
			>
				<Tooltip placement="top-start" popup="Top start">
					<Button block style={ceilStyle}>
						Top start
					</Button>
				</Tooltip>
				<Tooltip placement="top" popup="Top">
					<Button block style={ceilStyle}>
						Top
					</Button>
				</Tooltip>
				<Tooltip placement="top-end" popup="Top end">
					<Button block style={ceilStyle}>
						Top end
					</Button>
				</Tooltip>
				<Tooltip placement="left-start" popup="Left start">
					<Button block style={ceilStyle}>
						Left start
					</Button>
				</Tooltip>
				<div style={ceilStyle}></div>
				<Tooltip placement="right-start" popup="Right start">
					<Button block style={ceilStyle}>
						Right start
					</Button>
				</Tooltip>
				<Tooltip placement="left" popup="Left">
					<Button block style={ceilStyle}>
						Left
					</Button>
				</Tooltip>
				<div style={ceilStyle}></div>
				<Tooltip placement="right" popup="Right">
					<Button block style={ceilStyle}>
						Right
					</Button>
				</Tooltip>
				<Tooltip placement="left-end" popup="Left end">
					<Button block style={ceilStyle}>
						Left end
					</Button>
				</Tooltip>
				<div style={ceilStyle}></div>
				<Tooltip placement="right-end" popup="Right end">
					<Button block style={ceilStyle}>
						Right end
					</Button>
				</Tooltip>
				<Tooltip placement="bottom-start" popup="Bottom start">
					<Button block style={ceilStyle}>
						Bottom start
					</Button>
				</Tooltip>
				<Tooltip placement="bottom" popup="Bottom">
					<Button block style={ceilStyle}>
						Bottom
					</Button>
				</Tooltip>
				<Tooltip placement="bottom-end" popup="Bottom end">
					<Button block style={ceilStyle}>
						Bottom end
					</Button>
				</Tooltip>
			</div>
			<Divider />
			<Space size="large">
				<Tooltip popup="Icon tooltip">
					<Button circle>{/* <Icon path={mdiCheck} /> */}</Button>
				</Tooltip>
				<Tooltip popup="Button tooltip">
					<Button primary>Primary button</Button>
				</Tooltip>
				<Tooltip popup="Switch tooltip">
					<Switch />
				</Tooltip>
				<Tooltip popup="Tooltip">
					<span>Text or anything</span>
				</Tooltip>
			</Space>
			<Divider />
			<Space size="large">
				<Tooltip popup="Dark tooltip">
					<Button>dark</Button>
				</Tooltip>
				<Tooltip light popup="Light tooltip">
					<Button>light</Button>
				</Tooltip>
			</Space>
			<Divider />
			<Space>
				{/* <Tooltip content="Enabled">
					<Button icon={<Icon path={mdiCheck} />}>Enabled</Button>
				</Tooltip>
				<Tooltip content="Disabled" disabled>
					<Button icon={<Icon path={mdiClose} />}>Disabled</Button>
				</Tooltip> */}
			</Space>
		</div>
	)
}
