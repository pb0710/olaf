import React, { useState } from 'react'
import { Button, Card, Divider, Modal } from '@olaf/react-ui/src'

export default () => {
	const [open, setOpen] = useState(false)
	const show = () => setOpen(true)
	const hide = () => setOpen(false)
	return (
		<div style={{ padding: 24 }}>
			<h1>Modal</h1>
			<Button onClick={show}>Show modal</Button>
			<Modal open={open} title="Basic Modal" onCancel={hide}>
				<Card>Content</Card>
			</Modal>
			<Divider />
		</div>
	)
}
