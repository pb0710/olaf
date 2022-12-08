import React, {
	CSSProperties,
	FC,
	HTMLAttributes,
	MouseEventHandler,
	ReactNode,
	useEffect,
	useLayoutEffect,
	useRef,
	useState
} from 'react'
import { cls, is } from '@olaf/utils/src'
import { UI_PREFIX } from '../../constants'
import './select.scss'
import Dropdown from '../dropdown'
import { useBoolean, useLatestRef } from '@olaf/react-hook/src'
import Tag from '../tag'
import Space from '../space'
import Input from '../input'
import { TbCheck, TbChevronDown } from 'react-icons/tb'

interface SelectProps extends Omit<HTMLAttributes<HTMLElement>, 'defaultValue' | 'onChange'> {
	block?: boolean
	multiple?: boolean
	disabled?: boolean
	filter?: boolean
	placeholder?: string
	allowClear?: boolean
	value?: string | number | (string | number)[]
	defaultValue?: SelectProps['value']
	options?: { label: ReactNode; value: string | number }[]
	onChange?: (value: SelectProps['value']) => void
}

const Select: FC<SelectProps> = props => {
	const {
		className,
		block = false,
		multiple = false,
		disabled = false,
		filter = false,
		placeholder = '请选择',
		allowClear = false,
		defaultValue,
		value,
		options = [],
		onChange,
		onClick,
		...rest
	} = props

	const [
		dropdownVisible,
		{ setBool: setDropdownVisible, setReverse: toggleDropdown, setTrue: showDropdown, setFalse: hideDropdown }
	] = useBoolean(false)

	let _defaultValue
	const isControlled = is.undefined(defaultValue)
	if (isControlled) {
		_defaultValue = multiple ? value ?? [] : value
	} else {
		_defaultValue = multiple ? defaultValue ?? [] : defaultValue
	}
	const [_value, _setValue] = useState(_defaultValue)
	const _valueRef = useLatestRef(_value)

	useEffect(() => {
		if (disabled) return
		if (isControlled) _setValue(value)
	}, [disabled, isControlled, value])

	const handleCustomClick: MouseEventHandler<HTMLElement> = e => {
		if (disabled) return
		if (filter) {
			onClick?.(e)
			inputRef.current?.focus()
			return
		}
		onClick?.(e)
		toggleDropdown()
	}

	const [filterVal, setFilterVal] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)

	const [minWidth, setMinWidth] = useState<CSSProperties['width']>('initial')
	const selectRef = useRef<HTMLDivElement>(null)
	useLayoutEffect(() => {
		if (dropdownVisible) {
			const selectWidth = selectRef.current?.getBoundingClientRect().width
			if (!is.undefined(selectWidth)) {
				setMinWidth(selectRef.current?.offsetWidth)
			}
			inputRef.current?.focus()
		} else {
			inputRef.current?.blur()
		}
	}, [dropdownVisible])

	const prefixCls = `${UI_PREFIX}-select`

	const filteredOptions = options.filter(opt => {
		if (!filter) return true

		return String(opt.label).includes(filterVal)
	})

	const dropdownContentEle = (
		<Dropdown.Menu style={{ minWidth }}>
			{is.array.empty(filteredOptions) ? (
				<div className={`${prefixCls}-empty`}>暂无数据</div>
			) : (
				filteredOptions.map(opt => {
					let active: boolean
					if (multiple) {
						active = (_value as (string | number)[]).includes(opt.value)
					} else {
						active = opt.value === _value
					}
					const handleSelect = () => {
						if (multiple) {
							let selection = [...(_valueRef.current as (string | number)[])]
							if (selection.includes(opt.value)) {
								selection = selection.filter(val => val !== opt.value)
							} else {
								selection.push(opt.value)
							}
							if (!isControlled) {
								_setValue(selection)
							}
							onChange?.(selection)
						} else {
							if (!isControlled) {
								_setValue(opt.value)
							}
							onChange?.(opt.value)
							hideDropdown()
						}

						if (filter) {
							setFilterVal('')
							if (multiple) {
								inputRef.current?.focus()
							}
						}
					}
					return (
						<Dropdown.Item
							key={opt.value}
							icon={
								active ? (
									<TbCheck className={`${prefixCls}-item-icon`} />
								) : (
									<div className={`${prefixCls}-item-icon`}></div>
								)
							}
							active={active}
							onClick={handleSelect}
						>
							{opt.label}
						</Dropdown.Item>
					)
				})
			)}
		</Dropdown.Menu>
	)

	const selectionCls = cls(`${prefixCls}-selection`, {
		[`${prefixCls}-selection-no-margin`]: filter && !multiple
	})
	const filterEle = filter ? (
		<Input
			className={cls(`${prefixCls}-selection-filter`, {
				[`${prefixCls}-selection-filter-placeholder-darker`]: !multiple && !dropdownVisible
			})}
			ref={inputRef}
			block
			bordered={false}
			size="small"
			placeholder={
				multiple
					? is.array.empty(_value)
						? placeholder
						: ''
					: String(options.find(opt => opt.value === _value)?.label) || placeholder
			}
			allowClear={allowClear}
			value={filterVal}
			onChange={val => {
				setFilterVal(val as string)
			}}
			onBlur={() => {
				if (multiple) return
				hideDropdown()
			}}
			onFocus={() => {
				showDropdown()
			}}
			onKeyDown={e => {
				if (!filter || !multiple) return
				if (e.key === 'Backspace') {
					_setValue(p => {
						const selection = [...(p as (string | number)[])]
						selection.pop()
						return selection
					})
				}
			}}
		/>
	) : null

	const placeholderEle = <span className={`${prefixCls}-placeholder`}>{placeholder}</span>
	const selectionEle = multiple ? (
		<div className={selectionCls}>
			{is.array.empty(_value) ? (
				filter || placeholderEle
			) : (
				<Space size="small">
					{(options.filter(opt => (_value as (string | number)[]).includes(opt.value)) || []).map(opt => (
						<Tag key={opt.value} size="small" bordered round>
							{opt.label}
						</Tag>
					))}
				</Space>
			)}
			{filterEle}
		</div>
	) : (
		<div className={selectionCls}>
			{filter
				? filterEle
				: is.undefined(_value)
				? placeholderEle
				: options.find(opt => opt.value === _value)?.label}
		</div>
	)

	return (
		<Dropdown
			trigger="manual"
			open={dropdownVisible}
			onVisibleChange={setDropdownVisible}
			onClickOutside={() => {
				hideDropdown()
			}}
			content={dropdownContentEle}
		>
			<div>
				<div
					ref={selectRef}
					className={cls(className, prefixCls, {
						[`${prefixCls}-block`]: block,
						[`${prefixCls}-disabled`]: disabled
					})}
					onClick={handleCustomClick}
					{...rest}
				>
					{selectionEle}
					<TbChevronDown className={`${prefixCls}-arrow`} />
				</div>
			</div>
		</Dropdown>
	)
}
Select.displayName = 'Select'
export default Select
