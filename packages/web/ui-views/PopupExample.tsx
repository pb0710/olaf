import React from 'react'
import { Popover } from '@olaf/react-ui/src'

export default () => {
	return (
		<div style={{ padding: 24 }}>
			<h1>Popup</h1>
			<Popover placement="bottom" content="pop0000">
				<Popover placement="right" content="pop1111">
					<span>111</span>
				</Popover>
			</Popover>
		</div>
	)
}
