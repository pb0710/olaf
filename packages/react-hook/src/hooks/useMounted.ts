import { useLayoutEffect } from 'react'
import { useLatestRef } from './useLatestRef'

export function useMounted(callback: () => void): void {
	const callbackRef = useLatestRef(callback)
	useLayoutEffect(() => {
		callbackRef.current?.()
	}, [callbackRef])
}
