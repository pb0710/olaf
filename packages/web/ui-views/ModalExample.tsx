import React, { useState } from 'react'
import { Button, Card, Divider, Modal } from '@olaf/react-ui/src'

export default () => {
	const [visible, setVisible] = useState(false)
	const show = () => setVisible(true)
	const hide = () => setVisible(false)
	return (
		<div style={{ padding: 24 }}>
			<h1>Modal</h1>
			<Button onClick={show}>Show modal</Button>
			<Modal visible={visible} title="Basic Modal" onCancel={hide}>
				<Card>Content</Card>
			</Modal>
			<Divider />
		</div>
	)
}
