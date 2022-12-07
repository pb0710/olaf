import { autoUpdate, flip, Placement, useFloating } from '@floating-ui/react-dom'
import { useComposeRef } from '@olaf/react-hook/src'
import React, {
	Children,
	cloneElement,
	forwardRef,
	HTMLAttributes,
	MouseEvent,
	ReactElement,
	ReactNode,
	useEffect,
	useRef,
	useState
} from 'react'
import { createPortal } from 'react-dom'
import { UI_PREFIX } from '../../constants'
import Motion from '../motion'
import './trigger.scss'

export const EventsByTriggerNeed = [
	'onClick',
	'onMouseEnter',
	'onMouseLeave',
	'onMouseMove',
	'onFocus',
	'onBlur',
	'onContextMenu',
	'onKeyDown'
] as (
	| 'onClick'
	| 'onMouseEnter'
	| 'onMouseLeave'
	| 'onMouseMove'
	| 'onFocus'
	| 'onBlur'
	| 'onContextMenu'
	| 'onKeyDown'
)[]

export interface TriggerProps extends HTMLAttributes<HTMLElement> {
	children: ReactElement
	open?: boolean
	defaultOpen?: boolean
	popup?: ReactNode
	trigger?: 'hover' | 'click' | 'manual'
	placement?: Placement
	mouseEnterDelay?: number
	mouseLeaveDelay?: number
	spacing?: number
	disabled?: boolean
	unmountOnExit?: boolean
	motion?: 'grow' | 'stretch' | 'none'
	growTransformOrigin?: string
	offsetX?: number
	offsetY?: number
	appendTo?: HTMLElement
	onClickOutside?: (event: globalThis.MouseEvent) => void
	onVisibleChange?: (visible: boolean) => void
}

const Trigger = forwardRef<HTMLElement, TriggerProps>((props, outerRef) => {
	const {
		children,
		popup,
		defaultOpen: defaultOpen = false,
		open = defaultOpen,
		trigger = 'hover',
		placement = 'bottom-start',
		mouseEnterDelay = 100,
		mouseLeaveDelay = 100,
		spacing = 8,
		disabled = false,
		unmountOnExit = true,
		motion = 'none',
		growTransformOrigin = 'center',
		offsetX = 0,
		offsetY = 0,
		appendTo = document.body,
		onClickOutside,
		onVisibleChange
	} = props

	const isHover = trigger === 'hover'
	const isClick = trigger === 'click'
	const isManual = trigger === 'manual'

	const { x, y, floating, strategy, refs } = useFloating({
		placement,
		whileElementsMounted: autoUpdate,
		middleware: [flip()]
	})

	const [stretchDirection] = placement.split('-') as ['left' | 'top' | 'right' | 'bottom']
	const spacingName = {
		left: 'paddingRight',
		right: 'paddingLeft',
		top: 'paddingBottom',
		bottom: 'paddingTop'
	}[stretchDirection] as 'paddingRight' | 'paddingLeft' | 'paddingBottom' | 'paddingTop'

	const [_open, _setOpen] = useState(isManual ? open : defaultOpen)

	const timerRef = useRef(0)
	const setDelayOpen = (val: boolean, delay: number) => {
		if (delay) {
			clearTimeout(timerRef.current)
			timerRef.current = window.setTimeout(() => {
				onVisibleChange?.(val)
				_setOpen(val)
			}, delay)
		} else {
			onVisibleChange?.(val)
			_setOpen(val)
		}
	}

	const child = Children.only(children)
	const doChildEvent = (eventName: string, event: MouseEvent) => {
		child.props[eventName]?.(event)
	}

	const onMouseEnter = (event: MouseEvent) => {
		doChildEvent('onMouseEnter', event)
		setDelayOpen(true, mouseEnterDelay)
	}
	const onMouseLeave = (event: MouseEvent) => {
		doChildEvent('onMouseLeave', event)
		setDelayOpen(false, mouseLeaveDelay)
	}
	const onClick = (event: MouseEvent) => {
		doChildEvent('onClick', event)
		event.nativeEvent.stopImmediatePropagation()
		_setOpen(p => !p)
	}

	const mixProps: Record<string, any> = {
		[`data-open`]: _open
	}
	if (isHover) {
		mixProps.onMouseEnter = onMouseEnter
		mixProps.onMouseLeave = onMouseLeave
	} else if (isClick) {
		mixProps.onClick = onClick
	}

	const popupProps: Record<string, any> = {}
	if (isHover) {
		popupProps.onMouseEnter = onMouseEnter
		popupProps.onMouseLeave = onMouseLeave
	}

	useEffect(() => {
		const hide = (event: globalThis.MouseEvent) => {
			if (!_open) return
			if (isClick) {
				_setOpen(false)
			}
			onClickOutside?.(event)
		}
		document.addEventListener('click', hide)
		return () => {
			document.removeEventListener('click', hide)
		}
	}, [_open, isClick, onClickOutside])

	useEffect(() => {
		_setOpen(open)
	}, [open])

	const prefixCls = `${UI_PREFIX}-trigger`

	const popupEle = (
		<div
			ref={floating}
			className={`${prefixCls}-content`}
			style={{
				position: strategy,
				top: (y ?? 0) + offsetY,
				left: (x ?? 0) + offsetX,
				width: 'max-content',
				[spacingName]: spacing
			}}
			{...mixProps}
			onClick={event => {
				event.nativeEvent.stopImmediatePropagation()
			}}
		>
			{popup}
		</div>
	)

	function createPortalEle() {
		switch (motion) {
			case 'none':
				if (unmountOnExit) {
					return _open ? popupEle : null
				}
				return <div style={{ width: 'max-content', display: _open ? 'initial' : 'none' }}>{popupEle}</div>

			case 'stretch':
				return (
					<Motion.Stretch in={_open} mountOnEnter unmountOnExit={unmountOnExit} direction={stretchDirection}>
						{popupEle}
					</Motion.Stretch>
				)

			case 'grow':
				return (
					<Motion.Grow
						in={_open}
						mountOnEnter
						unmountOnExit={unmountOnExit}
						style={{ transformOrigin: growTransformOrigin }}
					>
						{popupEle}
					</Motion.Grow>
				)
		}
	}

	const ref = useComposeRef(outerRef, refs.reference)
	const triggerEle = cloneElement(child, {
		ref,
		...mixProps
	})

	return disabled ? (
		child
	) : (
		<>
			{triggerEle}
			{createPortal(createPortalEle(), appendTo)}
		</>
	)
})
Trigger.displayName = 'Trigger'
export default Trigger
