import { Placement, useFloating } from '@floating-ui/react-dom'
import { useComposeRef } from '@olaf/react-hook/src'
import React, {
	cloneElement,
	forwardRef,
	isValidElement,
	MouseEvent,
	MouseEventHandler,
	ReactNode,
	useEffect,
	useRef,
	useState
} from 'react'
import { createPortal } from 'react-dom'
import { UI_PREFIX } from '../../constants'
import Motion from '../motion'
import './trigger.scss'

export interface TriggerProps {
	children: ReactNode
	visible?: boolean
	defaultVisible?: boolean
	content?: ReactNode
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
		content,
		defaultVisible = false,
		visible = defaultVisible,
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
		placement
	})

	const [stretchDirection] = placement.split('-') as ['left' | 'top' | 'right' | 'bottom']
	let spacingName: 'paddingRight' | 'paddingLeft' | 'paddingBottom' | 'paddingTop'
	switch (stretchDirection) {
		case 'left':
			spacingName = 'paddingRight'
			break
		case 'right':
			spacingName = 'paddingLeft'
			break
		case 'top':
			spacingName = 'paddingBottom'
			break
		case 'bottom':
			spacingName = 'paddingTop'
			break
	}

	const [_visible, _setVisible] = useState(isManual ? visible : defaultVisible)

	const timerRef = useRef(0)
	const setVisibleDelay = (val: boolean, delay: number) => {
		if (delay) {
			clearTimeout(timerRef.current)
			timerRef.current = window.setTimeout(() => {
				onVisibleChange?.(val)
				_setVisible(val)
			}, delay)
		} else {
			onVisibleChange?.(val)
			_setVisible(val)
		}
	}

	const createHoverhandler = (onMouseEnter?: MouseEventHandler, onMouseLeave?: MouseEventHandler) => {
		if (!isHover) {
			return {}
		}
		return {
			onMouseEnter(event: MouseEvent) {
				onMouseEnter?.(event)
				setVisibleDelay(true, mouseEnterDelay)
			},
			onMouseLeave(event: MouseEvent) {
				onMouseLeave?.(event)
				setVisibleDelay(false, mouseLeaveDelay)
			}
		}
	}

	const createClickHandler = (onClick?: MouseEventHandler) => {
		if (!isClick) {
			return {}
		}
		return {
			onClick(event: MouseEvent) {
				onClick?.(event)
				event.nativeEvent.stopImmediatePropagation()
				_setVisible(pre => !pre)
			}
		}
	}

	useEffect(() => {
		const hide = (event: globalThis.MouseEvent) => {
			if (!_visible) return
			if (isClick) {
				_setVisible(false)
			}
			onClickOutside?.(event)
		}
		document.addEventListener('click', hide)
		return () => {
			document.removeEventListener('click', hide)
		}
	}, [_visible, isClick, onClickOutside])

	useEffect(() => {
		_setVisible(visible)
	}, [visible])

	const prefixCls = `${UI_PREFIX}-trigger`

	const contentEle = (
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
			{...createHoverhandler()}
			onClick={event => {
				event.nativeEvent.stopImmediatePropagation()
			}}
		>
			{content}
		</div>
	)

	let portalEle: ReactNode
	switch (motion) {
		case 'none':
			if (unmountOnExit) {
				portalEle = _visible ? contentEle : null
			} else {
				portalEle = (
					<div style={{ width: 'max-content', display: _visible ? 'initial' : 'none' }}>{contentEle}</div>
				)
			}
			break
		case 'stretch':
			portalEle = (
				<Motion.Stretch in={_visible} mountOnEnter unmountOnExit={unmountOnExit} direction={stretchDirection}>
					{contentEle}
				</Motion.Stretch>
			)
			break
		case 'grow':
			portalEle = (
				<Motion.Grow
					in={_visible}
					mountOnEnter
					unmountOnExit={unmountOnExit}
					style={{ transformOrigin: growTransformOrigin }}
				>
					{contentEle}
				</Motion.Grow>
			)
			break
	}

	const ref = useComposeRef(outerRef, refs.reference)
	const triggerEle = isValidElement<any>(children)
		? cloneElement(children, {
				ref,
				...createHoverhandler(children.props.onMouseEnter, children.props.onMouseLeave),
				...createClickHandler(children.props.onClick)
		  })
		: null

	return disabled ? (
		isValidElement(children) ? (
			children
		) : null
	) : (
		<>
			{triggerEle}
			{createPortal(portalEle, appendTo)}
		</>
	)
})
Trigger.displayName = 'Trigger'
export default Trigger
