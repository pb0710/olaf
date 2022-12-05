import React, { forwardRef } from 'react'
import Divider, { DividerProps } from '../divider'

const DropdownDivider = forwardRef<HTMLDivElement, DividerProps>((props, outerRef) => {
	const { size = 'small', ...rest } = props
	return <Divider ref={outerRef} size={size} {...rest} />
})

export default DropdownDivider
