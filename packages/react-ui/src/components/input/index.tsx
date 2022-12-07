import { useBoolean } from '@olaf/react-hook/src'
import { cls, is } from '@olaf/utils/src'
import React, {
	ChangeEvent,
	ChangeEventHandler,
	FocusEventHandler,
	forwardRef,
	HTMLAttributes,
	MouseEventHandler,
	MutableRefObject,
	ReactNode,
	useEffect,
	useRef
} from 'react'
import { UI_PREFIX } from '../../constants'
import { IoMdCloseCircle } from 'react-icons/io'
import './input.scss'
import Textarea from './Textarea'

interface InputProps extends Omit<HTMLAttributes<HTMLInputElement>, 'maxLength' | 'onChange' | 'prefix'> {
	value?: string | number
	size?: 'small' | 'medium' | 'large'
	block?: boolean
	round?: boolean
	bordered?: boolean
	disabled?: boolean
	prefix?: ReactNode
	suffix?: ReactNode
	allowClear?: boolean
	onChange?: ChangeEventHandler<HTMLInputElement> & ((value: string | number) => void)
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, propRef) => {
	const {
		className,
		defaultValue,
		value,
		onFocus,
		onBlur,
		onChange,
		prefix,
		suffix,
		size = 'medium',
		block = false,
		round = false,
		disabled = false,
		allowClear = false,
		bordered = true,
		...rest
	} = props

	const ref = useRef<HTMLInputElement>(null)
	const inputRef = (propRef ?? ref) as MutableRefObject<HTMLInputElement>
	const [focus, { setTrue: setFocus, setFalse: setBlur }] = useBoolean(false)
	const [clearVisible, { setTrue: showClear, setFalse: hideClear, setBool: setClearVisible }] = useBoolean(false)
	const isControlled = !is.undefined(value)

	const handleFocus: FocusEventHandler<HTMLInputElement> = event => {
		onFocus?.(event)
		setFocus()
	}
	const handleBlur: FocusEventHandler<HTMLInputElement> = event => {
		onBlur?.(event)
		setBlur()
	}
	const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
		const { value } = event.target

		if (isControlled) onChange?.(value)
		else onChange?.(event)

		setClearVisible(!!value)
	}
	const handleClear = () => {
		if (isControlled) onChange?.('')
		else {
			inputRef.current.value = ''
			onChange?.({ target: inputRef.current } as ChangeEvent<HTMLInputElement>)
		}
		hideClear()
	}

	const handleMouseDown: MouseEventHandler<SVGElement> = event => {
		if (event.target instanceof Element) {
			if (event.target.tagName !== 'INPUT') event.preventDefault()
		}
	}

	useEffect(() => {
		if (defaultValue) showClear()
	}, [defaultValue, showClear])

	const prefixCls = `${UI_PREFIX}-input`

	const valueProps = isControlled ? { value } : { defaultValue }

	return (
		<label
			className={cls(className, prefixCls, `${prefixCls}-${size}`, {
				[`${prefixCls}-focus`]: focus,
				[`${prefixCls}-block`]: block,
				[`${prefixCls}-round`]: round,
				[`${prefixCls}-bordered`]: bordered,
				[`${prefixCls}-disabled`]: disabled
			})}
		>
			{prefix}
			<input
				{...rest}
				{...valueProps}
				disabled={disabled}
				className={`${prefixCls}-inner`}
				ref={inputRef}
				// 去除 size=20 最小宽度
				size={1}
				type="text"
				onFocus={handleFocus}
				onBlur={handleBlur}
				onChange={handleChange}
			/>
			{allowClear && (
				<IoMdCloseCircle
					className={`${prefixCls}-clear-icon`}
					style={{ visibility: focus && clearVisible ? 'initial' : 'hidden' }}
					onClick={handleClear}
					onMouseDown={handleMouseDown}
				/>
			)}
			{suffix}
		</label>
	)
})

const ExportInput = Input as typeof Input & {
	Textarea: typeof Textarea
}
ExportInput.Textarea = Textarea

export default ExportInput
