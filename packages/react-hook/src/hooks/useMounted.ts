import { useLayoutEffect } from 'react'
import { useLatestRef } from './useLatestRef'

export function useMounted(cb: () => void): void {
	const cbRef = useLatestRef(cb)
	useLayoutEffect(() => {
		cbRef.current?.()
	}, [cbRef])
}
