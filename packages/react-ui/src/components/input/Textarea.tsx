import React, {
	ChangeEventHandler,
	FocusEventHandler,
	forwardRef,
	MutableRefObject,
	TextareaHTMLAttributes,
	useRef
} from 'react'
import { cls, is } from '@olaf/utils/src'
import './textarea.scss'
import TextareaAutosize from 'react-textarea-autosize'
import { UI_PREFIX } from '../../constants'
import { useBoolean } from '@olaf/react-hook/src'

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'style'> {
	autosize?: boolean
	minRows?: number
	maxRows?: number
	block?: boolean
	disabled?: boolean
	value?: string | number
	onChange?: ChangeEventHandler<HTMLTextAreaElement> & ((value?: string | number) => void)
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, propRef) => {
	const {
		className,
		autosize = false,
		block = false,
		disabled = false,
		minRows = 1,
		maxRows = Infinity,
		defaultValue,
		value,
		onChange,
		onFocus,
		onBlur,
		...rest
	} = props

	const innerRef = useRef<HTMLTextAreaElement>(null)
	const textareaRef = (propRef || innerRef) as MutableRefObject<null>
	const [focus, { setTrue: setFocus, setFalse: setBlur }] = useBoolean(false)
	const isControlled = !is.undefined(value)

	const handleChange: ChangeEventHandler<HTMLTextAreaElement> = event => {
		if (isControlled) onChange?.(event.target.value)
		else onChange?.(event)
	}

	const handleFocus: FocusEventHandler<HTMLTextAreaElement> = event => {
		onFocus?.(event)
		setFocus()
	}

	const handleBlur: FocusEventHandler<HTMLTextAreaElement> = event => {
		onBlur?.(event)
		setBlur()
	}

	const TextareaComp = autosize ? TextareaAutosize : 'textarea'
	const valueProps = isControlled ? { value } : { defaultValue }
	const autosizeProps = autosize ? { minRows, maxRows } : {}

	const prefixCls = `${UI_PREFIX}-textarea`

	return (
		<label
			className={cls(className, prefixCls, {
				[`${prefixCls}-focus`]: focus,
				[`${prefixCls}-block`]: block,
				[`${prefixCls}-disabled`]: disabled
			})}
		>
			<TextareaComp
				{...valueProps}
				{...autosizeProps}
				{...rest}
				className={`${prefixCls}-inner`}
				ref={textareaRef}
				disabled={disabled}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
			></TextareaComp>
		</label>
	)
})

export default Textarea
