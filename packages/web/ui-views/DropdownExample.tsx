import React, { useState } from 'react'
import { Button, Divider, Dropdown, Space } from '@olaf/react-ui/src'
import { TbCheck } from 'react-icons/tb'

export default () => {
	const [open, setOpen] = useState(false)
	return (
		<div style={{ padding: 24 }}>
			<h1>Dropdown</h1>
			<Divider />
			<Space>
				<Dropdown
					content={
						<Dropdown.Menu>
							<Dropdown.Item>dropdown item 1</Dropdown.Item>
							<Dropdown.Item>dropdown item 2</Dropdown.Item>
							<Dropdown.Item>dropdown item 3</Dropdown.Item>
						</Dropdown.Menu>
					}
				>
					<Button>hover</Button>
				</Dropdown>
				<Dropdown
					trigger="click"
					content={
						<Dropdown.Menu>
							<Dropdown.Item>dropdown item 1</Dropdown.Item>
							<Dropdown.Item>dropdown item 2</Dropdown.Item>
							<Dropdown.Item>dropdown item 3</Dropdown.Item>
						</Dropdown.Menu>
					}
				>
					<Button>click</Button>
				</Dropdown>
				<Dropdown
					trigger="manual"
					open={open}
					onOpenChange={val => {
						console.log('val: ', val)
						setOpen(val)
					}}
					onClickOutside={() => {
						setOpen(false)
					}}
					content={
						<Dropdown.Menu>
							<Dropdown.Item
								onClick={() => {
									setOpen(false)
								}}
							>
								dropdown item 1
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => {
									setOpen(false)
								}}
							>
								dropdown item 2
							</Dropdown.Item>
						</Dropdown.Menu>
					}
				>
					<Button
						onClick={() => {
							setOpen(p => !p)
						}}
					>
						manual
					</Button>
				</Dropdown>
			</Space>
			<Divider />
			<Dropdown
				content={
					<Dropdown.Menu>
						<Dropdown.Title>Group 1</Dropdown.Title>
						<Dropdown.Item>dropdown item 1</Dropdown.Item>
						<Dropdown.Item>dropdown item 2</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Title>Group 2</Dropdown.Title>
						<Dropdown.Item>dropdown item 1</Dropdown.Item>
						<Dropdown.Item>dropdown item 2</Dropdown.Item>
					</Dropdown.Menu>
				}
			>
				<Button>compose</Button>
			</Dropdown>
			<Divider />
			<Dropdown
				content={
					<Dropdown.Menu>
						<Dropdown.Item>dropdown item 1</Dropdown.Item>
						<Dropdown
							placement="right-start"
							content={
								<Dropdown.Menu>
									<Dropdown.Item>dropdown item 1</Dropdown.Item>
									<Dropdown.Item>dropdown item 2</Dropdown.Item>
									<Dropdown.Item>dropdown item 3</Dropdown.Item>
									<Dropdown.Item>dropdown item 4</Dropdown.Item>
									<Dropdown.Item>dropdown item 5</Dropdown.Item>
									<Dropdown.Item>dropdown item 6</Dropdown.Item>
								</Dropdown.Menu>
							}
						>
							<Dropdown.Item>dropdown item 2</Dropdown.Item>
						</Dropdown>
						<Dropdown.Item>dropdown item 3</Dropdown.Item>
					</Dropdown.Menu>
				}
			>
				<Button>hover nested</Button>
			</Dropdown>
			<Divider />
			<Dropdown
				trigger="click"
				content={
					<Dropdown.Menu>
						<Dropdown.Item icon={<TbCheck />}>Dropdown item 1</Dropdown.Item>
						<Dropdown.Item icon={<TbCheck />}>Dropdown item 2</Dropdown.Item>
						<Dropdown.Item icon={<TbCheck />}>Dropdown item 3</Dropdown.Item>
					</Dropdown.Menu>
				}
			>
				<Button>icon dropdown</Button>
			</Dropdown>
		</div>
	)
}
