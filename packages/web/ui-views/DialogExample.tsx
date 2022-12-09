import React, { useState } from 'react'
import { Button, Divider, Dialog } from '@olaf/react-ui/src'

export default () => {
	const [open, setOpen] = useState(false)
	const show = () => setOpen(true)
	const hide = () => setOpen(false)
	return (
		<div style={{ padding: 24 }}>
			<h1>Dialog</h1>
			<Button onClick={show}>Show dialog</Button>
			<Dialog open={open} title="Basic Dialog" onCancel={hide}>
				Content
			</Dialog>
			<Divider />
		</div>
	)
}
