import { is, ValueOf } from '@olaf/utils/src'
import { FormEventHandler, useCallback, useRef, ChangeEvent, useState } from 'react'
import { useLatestRef } from './useLatestRef'

export interface State {
	[key: string]: any
}
// TODO:
export interface FieldOptions {
	[key: string]: any
}
export interface Field<S> {
	label: keyof S
	options: FieldOptions
}
export type controllerChangeEvent = ChangeEvent<HTMLSelectElement | HTMLInputElement>
export interface Options<S> {
	defaultState: S
	onFulfilled(state: S): void
	onFailed?(): void
	onStateChange?(org: Field<S>): void
}
export interface FieldController<S = any> {
	defaultValue?: ValueOf<S>
	value?: ValueOf<S>
	onChange(arg: ValueOf<S> | controllerChangeEvent): void
}
export interface Form<S = any> {
	submit(): void
	getState(): S
	onSubmit: FormEventHandler<Element>
	subscribe(label: Field<S>['label'], options?: Field<S>['options']): FieldController<S>
	unsubscribe(label: string): void
}

export function useForm<S extends State>(options: Options<S>): Form<S> {
	const opts = useLatestRef(options)

	const [defaultState] = useState(opts.current.defaultState)
	const state = useRef<S>(defaultState)
	const fields = useRef<Field<S>[]>([])

	const getState = useCallback(() => state.current, [])

	const submit = useCallback(() => {
		opts.current.onFulfilled(state.current)
	}, [opts])

	const onSubmit: FormEventHandler = useCallback(
		event => {
			event.preventDefault()
			event.stopPropagation()
			submit()
		},
		[submit]
	)

	const subscribe = useCallback(
		(label: Field<S>['label'], options: Field<S>['options'] = {}) => {
			const field: Field<S> = { label, options }
			fields.current.push(field)
			const controller: FieldController<S> = {
				onChange(arg) {
					let val = arg
					if ((arg as controllerChangeEvent)?.nativeEvent instanceof Event)
						val = (arg as controllerChangeEvent).target.value as ValueOf<S>

					state.current[label] = val as ValueOf<S>
					opts.current.onStateChange?.(field)
				}
			}

			if (is.undefined(state.current[label])) {
				controller.defaultValue = defaultState[label]
			} else {
				controller.value = state.current[label]
			}
			return controller
		},
		[defaultState, opts]
	)
	const unsubscribe = useCallback((label: string) => {
		fields.current = fields.current.filter(field => field.label !== label)
	}, [])

	return {
		submit,
		getState,
		onSubmit,
		subscribe,
		unsubscribe
	}
}
