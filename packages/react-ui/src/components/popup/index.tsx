import {
	Placement,
	useFloating,
	autoUpdate,
	offset,
	flip,
	shift,
	useHover,
	useFocus,
	useDismiss,
	useRole,
	useInteractions,
	FloatingPortal
} from '@floating-ui/react-dom-interactions'
import { useComposeRef } from '@olaf/react-hook/src'
import React, {
	cloneElement,
	createContext,
	forwardRef,
	HTMLProps,
	isValidElement,
	ReactNode,
	useContext,
	useMemo,
	useState
} from 'react'
import { mergeRefs } from 'react-merge-refs'

interface TooltipOptions {
	initialOpen?: boolean
	placement?: Placement
	open?: boolean
	onOpenChange?: (open: boolean) => void
}

export function useTooltip({
	initialOpen = false,
	placement = 'top',
	open: controlledOpen,
	onOpenChange: setControlledOpen
}: TooltipOptions = {}) {
	const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen)

	const open = controlledOpen ?? uncontrolledOpen
	const setOpen = setControlledOpen ?? setUncontrolledOpen

	const data = useFloating({
		placement,
		open,
		onOpenChange: setOpen,
		whileElementsMounted: autoUpdate,
		middleware: [offset(5), flip(), shift()]
	})

	const context = data.context

	const hover = useHover(context, {
		move: false,
		enabled: controlledOpen == null
	})
	const focus = useFocus(context, {
		enabled: controlledOpen == null
	})
	const dismiss = useDismiss(context)
	const role = useRole(context, { role: 'tooltip' })

	const interactions = useInteractions([hover, focus, dismiss, role])

	return useMemo(
		() => ({
			open,
			setOpen,
			...interactions,
			...data
		}),
		[open, setOpen, interactions, data]
	)
}

type ContextType = ReturnType<typeof useTooltip> | null

const TooltipContext = createContext<ContextType>(null)

export const useTooltipState = () => {
	const context = useContext(TooltipContext)

	if (context == null) {
		throw new Error('Tooltip components must be wrapped in <Tooltip />')
	}

	return context
}

export function Tooltip({ children, ...options }: { children: ReactNode } & TooltipOptions) {
	// This can accept any props as options, e.g. `placement`,
	// or other positioning options.
	const tooltip = useTooltip(options)
	return <TooltipContext.Provider value={tooltip}>{children}</TooltipContext.Provider>
}

export const TooltipTrigger = forwardRef<HTMLElement, HTMLProps<HTMLElement> & { asChild?: boolean }>(
	function TooltipTrigger({ children, asChild = false, ...props }, propRef) {
		const state = useTooltipState()

		const childrenRef = (children as any).ref
		// const ref = useComposeRef(state.reference, propRef, childrenRef)
		const ref = React.useMemo(
			() => mergeRefs([state.reference, propRef, childrenRef]),
			[state.reference, propRef, childrenRef]
		)

		// `asChild` allows the user to pass any element as the anchor
		if (asChild && isValidElement(children)) {
			return cloneElement(
				children,
				state.getReferenceProps({
					ref,
					...props,
					...children.props,
					'data-state': state.open ? 'open' : 'closed'
				})
			)
		}

		return (
			<button
				ref={ref as any}
				// The user can style the trigger based on the state
				data-state={state.open ? 'open' : 'closed'}
				{...state.getReferenceProps(props)}
			>
				{children}
			</button>
		)
	}
)

export const TooltipContent = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>((props, propRef) => {
	const state = useTooltipState()
	console.log('state: ', state)

	// const ref = useComposeRef<HTMLDivElement>(state.floating, propRef)
	const ref = useMemo(() => mergeRefs([state.floating, propRef]), [state.floating, propRef])

	return (
		<FloatingPortal>
			{state.open && (
				<div
					ref={ref}
					style={{
						position: state.strategy,
						top: state.y ?? 0,
						left: state.x ?? 0,
						visibility: state.x == null ? 'hidden' : 'visible',
						...props.style
					}}
					{...state.getFloatingProps(props)}
				/>
			)}
		</FloatingPortal>
	)
})

export default Tooltip
