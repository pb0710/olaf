import React, { useState } from 'react'
import { Button, Divider, Dialog } from '@olaf/react-ui/src'

export default () => {
	const [visible, setVisible] = useState(false)
	const show = () => setVisible(true)
	const hide = () => setVisible(false)
	return (
		<div style={{ padding: 24 }}>
			<h1>Dialog</h1>
			<Button onClick={show}>Show dialog</Button>
			<Dialog visible={visible} title="Basic Dialog" onCancel={hide}>
				Content
			</Dialog>
			<Divider />
		</div>
	)
}
