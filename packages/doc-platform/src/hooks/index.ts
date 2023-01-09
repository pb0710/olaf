import { useEffect, useState } from 'react'

export function useAppContentEl() {
	const [app_content_ele, set_app_content_ele] = useState<HTMLElement | null>(null)
	useEffect(() => {
		set_app_content_ele(document.getElementById('app-content'))
	}, [])
	return app_content_ele
}
