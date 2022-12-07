import React from 'react'
import { Button, Divider, Space, Switch, Tooltip } from '@olaf/react-ui/src'
import './tooltip-example.scss'
import { TbCheck, TbSearch, TbX } from 'react-icons/tb'

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
				<Tooltip placement="top-start" title="Top start">
					<Button block style={ceilStyle}>
						Top start
					</Button>
				</Tooltip>
				<Tooltip placement="top" title="Top">
					<Button block style={ceilStyle}>
						Top
					</Button>
				</Tooltip>
				<Tooltip placement="top-end" title="Top end">
					<Button block style={ceilStyle}>
						Top end
					</Button>
				</Tooltip>
				<Tooltip placement="left-start" title="Left start">
					<Button block style={ceilStyle}>
						Left start
					</Button>
				</Tooltip>
				<div style={ceilStyle}></div>
				<Tooltip placement="right-start" title="Right start">
					<Button block style={ceilStyle}>
						Right start
					</Button>
				</Tooltip>
				<Tooltip placement="left" title="Left">
					<Button block style={ceilStyle}>
						Left
					</Button>
				</Tooltip>
				<div style={ceilStyle}></div>
				<Tooltip placement="right" title="Right">
					<Button block style={ceilStyle}>
						Right
					</Button>
				</Tooltip>
				<Tooltip placement="left-end" title="Left end">
					<Button block style={ceilStyle}>
						Left end
					</Button>
				</Tooltip>
				<div style={ceilStyle}></div>
				<Tooltip placement="right-end" title="Right end">
					<Button block style={ceilStyle}>
						Right end
					</Button>
				</Tooltip>
				<Tooltip placement="bottom-start" title="Bottom start">
					<Button block style={ceilStyle}>
						Bottom start
					</Button>
				</Tooltip>
				<Tooltip placement="bottom" title="Bottom">
					<Button block style={ceilStyle}>
						Bottom
					</Button>
				</Tooltip>
				<Tooltip placement="bottom-end" title="Bottom end">
					<Button block style={ceilStyle}>
						Bottom end
					</Button>
				</Tooltip>
			</div>
			<Divider />
			<Space size="large">
				<Tooltip title="Icon tooltip">
					<Button circle>
						<TbSearch />
					</Button>
				</Tooltip>
				<Tooltip title="Button tooltip">
					<Button primary>Primary button</Button>
				</Tooltip>
				<Tooltip title="Switch tooltip">
					<Switch />
				</Tooltip>
				<Tooltip title="Tooltip">
					<span>Text or anything</span>
				</Tooltip>
			</Space>
			<Divider />
			<Space size="large">
				<Tooltip title="Dark tooltip">
					<Button>dark</Button>
				</Tooltip>
				<Tooltip light title="Light tooltip">
					<Button>light</Button>
				</Tooltip>
			</Space>
			<Divider />
			<Space>
				<Tooltip title="Enabled">
					<Button icon={<TbCheck />}>Enabled</Button>
				</Tooltip>
				<Tooltip title="Disabled" disabled>
					<Button icon={<TbX />}>Disabled</Button>
				</Tooltip>
			</Space>
		</div>
	)
}
