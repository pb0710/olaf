import React, { forwardRef } from 'react'
import Divider, { DividerProps } from '../divider'

const DropdownDivider = forwardRef<HTMLDivElement, DividerProps>((props, propRef) => {
	const { size = 'small', ...rest } = props
	return <Divider ref={propRef} size={size} {...rest} />
})

export default DropdownDivider
