import { useCallback, useEffect, useRef, useState } from 'react'
import { useLatestRef } from './useLatestRef'

type PromiseResult<T extends Promise<unknown>> = T extends Promise<infer R> ? R : never
type Request = (...args: any[]) => Promise<any>
interface Options<T extends Request> {
	initialData?: PromiseResult<ReturnType<T>>
	manual?: boolean
	ready?: boolean
	loadingDelay?: number
	refreshDeps?: any[]
	defaultParams?: Parameters<T>
	onSuccess?(res: PromiseResult<ReturnType<T>>): void
	onError?(err: Error | null): void
}

export function useFetch<T extends Request, S extends Options<T>>(fetcher: T, opts: S) {
	const { manual = false, ready = true, loadingDelay = 0, refreshDeps = [] } = opts
	const fetcherRef = useLatestRef(fetcher)
	const optsRef = useLatestRef(opts)
	const _refreshDeps = manual ? [] : refreshDeps

	const [data, setData] = useState(optsRef.current.initialData)
	const [error, setError] = useState<Error | null>(null)
	const [loading, setLoading] = useState(false)
	const fetchCount = useRef(0)

	const run = useCallback(
		(...args: Parameters<T>[]) => {
			if (!ready) return

			const preCount = fetchCount.current
			const { onSuccess, onError } = optsRef.current
			setError(null)
			const loadingTimer = setTimeout(() => {
				setLoading(true)
			}, loadingDelay)

			fetcherRef
				.current(...args)
				.then((res: PromiseResult<ReturnType<T>>) => {
					if (fetchCount.current !== preCount) return
					onSuccess?.(res)
					setData(res)
				})
				.catch((err: PromiseResult<ReturnType<T>>) => {
					if (fetchCount.current !== preCount) return
					onError?.(new Error(err))
					setError(new Error(err))
				})
				.finally(() => {
					if (fetchCount.current !== preCount) return
					clearTimeout(loadingTimer)
					setLoading(false)
				})
		},
		[loadingDelay, optsRef, ready, fetcherRef]
	)

	useEffect(
		() => {
			if (!manual) {
				const { defaultParams = [] } = optsRef.current
				run(...defaultParams)
			}
			return () => {
				fetchCount.current += 1
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[manual, run, ..._refreshDeps]
	)

	return { data, error, loading, run, mutate: setData }
}
