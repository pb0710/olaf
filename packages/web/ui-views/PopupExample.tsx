// import { mdiAccount, mdiFileImageRemove } from '@mdi/js'
import React, { useState } from 'react'
import { Popup, Divider, Space, Popover } from '@olaf/react-ui/src'
import { Tooltip, TooltipTrigger, TooltipContent } from '@olaf/react-ui/src/components/popup'

export default () => {
	const [open, setOpen] = useState(false)
	const [open1, setOpen1] = useState(false)
	return (
		<div style={{ padding: 24 }}>
			<h1>Popup</h1>
			{/* <Tooltip open={open1} onOpenChange={setOpen1}>
				<TooltipTrigger
					asChild
					onClick={() => {
						console.log(111111)
						setOpen1(v => !v)
					}}
				>
					<Tooltip open={open} onOpenChange={setOpen}>
						<TooltipTrigger
							onClick={() => {
								console.log(222222)
								setOpen(v => !v)
							}}
						>
							My trigger
						</TooltipTrigger>
						<TooltipContent className="Tooltip">My tooltip</TooltipContent>
					</Tooltip>
				</TooltipTrigger>
				<TooltipContent className="Tooltip">My tooltip11111111</TooltipContent>
			</Tooltip> */}
			<br />
			<Popover placement="bottom" content="pop0000" motion="grow">
				<Popover placement="right" content="pop1111">
					<span>111</span>
				</Popover>
			</Popover>
		</div>
	)
}
